$(document).ready(function(){
	var Url = {
		load: "php/cart.php?method=get",
		add: "php/cart.php?method=add",
		remove: "php/cart.php?method=remove",
		clear: "php/cart.php?method=clear"
	}
	
	class Carousel {
		constructor(container) {
			this.container = container;
			this.currentItem = 1;
			this.itemCount = $(this.container).children().length;
			this.createWrapper();
			this.startCarousel();
			this.setEvents();
		}
		createWrapper() {
			var firstItem = $(this.container).children().first(),
				lastItem = $(this.container).children().last();
				
			$(this.container).append(firstItem.clone());
			$(this.container).append(firstItem.next().clone());
			$(this.container).prepend(lastItem.clone());
			$(this.container).prepend(lastItem.prev().clone());
			
			$(this.container).children().each(function(){
				$(this).addClass("carousel__item");
			});
			
			$(this.container + " > .carousel__item").wrapAll("<div class='carousel'>");
			$(this.container + "> .carousel").css("width", (this.itemCount + 4) * 300 + "px");
			$(this.container + " > .carousel").wrap("<div class='carousel-viewport'>");
			
			$(this.container + " > .carousel-viewport").append("<div class='carousel-controls'>" + 
			"<div class='carousel-controls__arrow carousel-controls__arrow--prev' id='prev'><img src='images/arrows/left-arrow.svg'></div>" + 
			"<div class='carousel-controls__arrow carousel-controls__arrow--next' id='next'><img src='images/arrows/right-arrow.svg'></div></div>");
		}
		startCarousel() {
			$(this.container + " > .carousel-viewport > .carousel").css("transform", "translate(-600px)");
		}
		setEvents(){
			$("#prev").click(function(e){
				this.changeItem(--this.currentItem);
			}.bind(this));
			
			$("#next").click(function(e){
				this.changeItem(++this.currentItem);
			}.bind(this));
		}
		changeItem(number) {
			$(this.container + " > .carousel-viewport > .carousel").css({"transform": "translate(-" + (number + 1) * 300 +"px)", "transition": "0.5s"});
			
			setTimeout(function(){
				if (number == -1) {
					number = this.itemCount - 1;
					this.currentItem = number;
					
					$(this.container + " > .carousel-viewport > .carousel").css({"transform": "translate(-" + (number + 1) * 300 +"px)", "transition": "0s"});
				};
				
				if (number == this.itemCount + 1) {
					number = 1;
					this.currentItem = number;
					
					$(this.container + " > .carousel-viewport > .carousel").css({"transform": "translate(-600px)", "transition": "0s"});					
				};
			}.bind(this), 500);
		}			
	};
	
	class Cart {
		constructor() {
			this.itemsCount = 0;
			this.totalPrice = 0;
			this.items = [];
			this.request(Url.load);
			this.setEvents();
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
					this.request(Url.add, 'id=' + id)
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
	};
	
	var carousel = new Carousel("#products");
	
	var cart = new Cart();
})