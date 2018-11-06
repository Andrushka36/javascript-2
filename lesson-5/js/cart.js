// взаимодействие с интерфейсом на клиенет (клики по кнопкам)
// запрос к API
// API отвечает на наши запросы
// в зависимости от ответов - перерисовываем интерфейс с учетом ответов
let Api = {
	load: 'php/cart.php?method=get',
	add: 'php/cart.php?method=add',
	remove: 'php/cart.php?method=remove',
	clear: 'php/cart.php?method=clear',
	review: {
		add: 'json/review.add.json',
		remove: 'json/review.delete.json',
		list: 'json/review.list.json',
		submit: 'json/review.submit.json'
	}
};
class Cart {
	constructor() {
		this.itemsCount = 0;
		this.totalAmount = 0;
		this.items = [];
		this.comments = [];
		this.unconfirmedComments = [];
		this.request(Api.load);
		this.requestReview(Api.review.list);
		this.setEvents();
	}
	onAdd(event){
		let id = parseInt($(event.currentTarget).attr('data-id'));

		if (id) {
			this.request(Api.add, 'id=' + id)
		}
	}
	onRemove(event){
		let id = parseInt($(event.currentTarget).attr('data-id'));

		if (id) {
			this.request(Api.remove, 'id=' + id);
		}
	}
	onClear() {
		this.request(Api.clear);
	}
	setEvents() {
		$('.btn-add').on('click', this.onAdd.bind(this));
		$('.btn-remove').on('click', this.onRemove.bind(this));
		$('.btn-clear').on('click', this.onClear.bind(this));
		$('.btn-add-review').on('click', this.onAddReview.bind(this));
	}
	getProduct(productId) {
		return this.items.find(function(item){
			return item.id == productId;
		});
	}
	removeProduct(productId) {
		let item = this.getProduct(productId);
		if (item) {
			if (item.count > 0) {
				--item.count;
			}
			if (item.count <= 0) {
				let index = this.items.indexOf(item);
				if (index !== -1) {
					this.items.splice(index, 1);
				}
			}
		} 
	}
	addProduct(product) {
		let item = this.getProduct(product.id);

		if (!item) {
			this.items.push(product);
		} else {
			++item.count;
		}
	}
	process(url, response){
		if (response.result) {
			switch (url) {
				case Api.load:
					this.items = response.items;
					break;
				case Api.add:
					this.addProduct(response.item);
					break;
				case Api.remove:
					this.removeProduct(response.id);
					break;
				case Api.clear:
					this.items = [];
					break;
			}
			this.calc();
			this.render();
		}
	}
	calc() {
		this.itemsCount = 0;
		this.totalAmount = 0;

		this.items.forEach(function(item){
			if (item.count > 0) {
				this.itemsCount += item.count;
				this.totalAmount += item.price * item.count;
			}
		}, this);
	}
	render() {
		$('#cart .items').html(this.itemsCount); // общее число товаров
		$('#cart .amount').html(this.totalAmount); // общая сумма по всем товарам

		// для всех продуктов
		$('.product').find('.count').html('0');
		this.items.forEach(function(item){
			$('#products .product-' + item.id).find('.count').html(item.count);

		}, this);
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
	requestReview (url, data) {
		$.get({
			url: url,
			data: data,
			dataType: 'json',
			context: this,
			success: function(response) {
				this.processReview(url, response, data);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	processReview(url, response, data) {
		if (response.result) {
			switch (url) {
				case Api.review.list:
					this.comments = response.comments;
					break;
				case Api.review.remove:
					var id = data.substr(data.indexOf("=") + 1);
					this.removeComment(id);
					break;
				case Api.review.add:
					var comment = data.substr(data.lastIndexOf("=") + 1);
					this.addComment(comment);
					break;
				case Api.review.submit:
					var id = data.substr(data.indexOf("=") + 1);
					this.submitComment(id);
					break;
			}
			
			this.showReview();			
		}
	}
	showReview() {
		$(".reviews-list").html("");
		
		for (var i = 0; i < this.comments.length; i++) {			
			var text;
			text = "<div class='comment'><p>" + this.comments[i].text + " (<a href='#' class='btn-remove-review'  data-id='" + this.comments[i].id_comment + "'>удалить</a>)</p></div>"
			$(".reviews-list").append(text);
		}
		
		$('.btn-remove-review').on('click', this.onRemoveReview.bind(this));
	}
	showUnconfirmedComments(){
		if (!$(".unconfirmed-reviews-list").length) {
			$(".reviews").append("<p><b>Отзывы (непроверенные)</b></p><div class='unconfirmed-reviews-list'></div>");
			
			for (var i = 0; i < this.unconfirmedComments.length; i++) {			
				var text;
				text = "<div class='comment'><p>" + this.unconfirmedComments[i].text + " (<a href='#' class='btn-submit-review'  data-id='" + this.unconfirmedComments[i].id_comment + "'>одобрить</a>)</p></div>"
				$(".unconfirmed-reviews-list").append(text);
			}
		} else {
			$(".unconfirmed-reviews-list").html("");
			for (var i = 0; i < this.unconfirmedComments.length; i++) {			
				var text;
				text = "<div class='comment'><p>" + this.unconfirmedComments[i].text + " (<a href='#' class='btn-submit-review'  data-id='" + this.unconfirmedComments[i].id_comment + "'>одобрить</a>)</p></div>"
				$(".unconfirmed-reviews-list").append(text);
			}
		}
		
		$('.btn-submit-review').on('click', this.onSubmitReview.bind(this));
	}
	onRemoveReview(event) {
		let id = parseInt($(event.currentTarget).attr('data-id'));
		
		if (id) {
			this.requestReview(Api.review.remove, 'id_comment=' + id);
		}
	}
	onAddReview(event) {
		var userId = 123;
		
		this.requestReview(Api.review.add, 'id_user=' + userId + '&text=' + $('#review-add').val());
		
		$('#review-add').val("");
	}
	onSubmitReview(event) {
		let id = parseInt($(event.currentTarget).attr('data-id'));
		
		if (id) {
			this.requestReview(Api.review.submit, 'id_comment=' + id);
		}
	}
	removeComment(id){
		let commentPosition = this.getCommentPosition(id, this.comments);
		
		this.comments.splice(commentPosition, 1);
	}
	addComment(comment) {
		var id = parseInt(this.comments[this.comments.length - 1].id_comment) + this.unconfirmedComments.length + 1;
		
		this.unconfirmedComments.push({"id_comment": id, "text": comment});
		
		this.showUnconfirmedComments();
	}
	submitComment(id) {		
		let commentPosition = this.getCommentPosition(id, this.unconfirmedComments);
		
		this.comments.push(this.unconfirmedComments[commentPosition]);
		
		this.unconfirmedComments.splice(commentPosition, 1);
		
		this.showUnconfirmedComments();
	}
	getCommentPosition(commentId, commentsList) {
		var comment = commentsList.find(function(item){
			return item.id_comment == commentId;
		});
		
		return commentsList.indexOf(comment);
	}
};

$(document).ready(function(){
	window.cart = new Cart();
});