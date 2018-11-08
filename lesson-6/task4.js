$(document).ready(function(){
	var Url = {
		load: "php/cart.php?method=get",
		add: "php/cart.php?method=add",
		remove: "php/cart.php?method=remove",
		clear: "php/cart.php?method=clear"
	}
	
	class Cart {
		constructor() {
			this.itemsCount = 0;
			this.totalPrice = 0;
			this.items = [];
			this.request(Url.load);
			this.setEvents();
			this.dragAndDropOn();
		}
		request(url, data) {
			$.get({
				url: url,
				data: data,
				dataType: 'json',
				context: this,
				success: function(response) {
					this.process(url, response);
				},
				error: function(error){
					console.log(error);
				}
			});
		}
		process(url, response){
			if (response.result) {
				switch (url) {
					case Url.load:
						this.items = response.items;
						break;
					case Url.add:
						this.addProduct(response.item);
						break;
					case Url.remove:
						this.removeProduct(response.id);
						break;
					case Url.clear:
						this.items = [];
						break;
				}
				this.calc();
				this.render();
			}
		}
		calc() {
			this.itemsCount = 0;
			this.totalPrice = 0;

			this.items.forEach(function(item){
				if (item.count > 0) {
					this.itemsCount += item.count;
					this.totalPrice += item.price * item.count;
				}
			}, this);
		}
		render() {
			$("#cart .cart__count").html(this.itemsCount);
			$("#cart .cart__price").html(this.totalPrice);

			$(".product-item__count").html("0");
			this.items.forEach(function(item){
				$("#products .product-item--" + item.id).find(".product-item__count").html(item.count);

			}, this);
		}
		setEvents() {
			$(".product-item__button--add").click(function(event){
				var id = parseInt($(event.currentTarget).attr('data-id'));

				if (id) {
					this.request(Url.add, 'id=' + id);
				}
			}.bind(this));
			
			$(".product-item__button--remove").click(function(event){
				var id = parseInt($(event.currentTarget).attr('data-id'));

				if (id) {
					this.request(Url.remove, 'id=' + id);
				}
			}.bind(this));
			
			$(".cart_clear").click(function(){
				this.request(Url.clear);
			}.bind(this));
		}
		getProduct(productId) {
			return this.items.find(function(item){
				return item.id == productId;
			});
		}
		addProduct(product) {
			let item = this.getProduct(product.id);

			if (!item) {
				this.items.push(product);
			} else {
				++item.count;
			}
		}
		removeProduct(productId) {
			var item = this.getProduct(productId);
			
			if (item) {
				if (item.count > 0) {
					--item.count;
				}
				if (item.count <= 0) {
					var index = this.items.indexOf(item);
					
					if (index !== -1) {
						this.items.splice(index, 1);
					}
				}
			} 
		}
		dragAndDropOn(){
			$( ".product-item" ).draggable({
				helper: function(e) {
					var result = $(e.currentTarget).children(".product-item__title").clone();
					return $(result);
				},
				cursorAt: { top: 56 },
				start: function(){
					var result = "<div class='mark-wrapper'><div class='mark'>Перетащи сюда</div></div>";
					$("#cart").append(result);
				},
				stop: function(){
					$(".mark-wrapper").remove();
				}
			});
			
			$("#cart").droppable({
				accept: ".product-item",
				classes: {
					"ui-droppable-hover": "cart--hover"
				},
				drop: function(e, ui) {
					var id = parseInt($(ui.draggable).attr('data-product-item'));
					
					if (id) {
						this.request(Url.add, 'id=' + id);
					}
				}.bind(this)
			})
		}
	};
	
	var cart = new Cart();
})