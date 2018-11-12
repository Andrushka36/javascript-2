var Form = function(url) {
	this.url = url;
	this.selector = "";
	this.fields = [];
}

Form.prototype.load = function(url) {
	$.get({
		url: url,
		dataType: "json",
		context: this,
		success: function(response){
			this.fields = response;
			
			this.render();
		}
	})	
}

Form.prototype.show = function(selector) {
	this.selector = selector;
		
	this.load(this.url);
}

Form.prototype.render = function() {
	for (var i = 0; i < this.fields.length; i++) {
		
		var field = document.createElement(this.fields[i].tag);
						
		$(this.selector).append(field);
		
		$(field).wrap("<div class='form__field form__field--" + this.fields[i].tag + "'></div>")
			.addClass("form__" + this.fields[i].tag)
			.attr({
				id: this.fields[i].id,
				placeholder: this.fields[i].name
			});
				
		if (this.fields[i].id == "date") {
			$(field).datepicker({
				firstDay: 1,
				dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
				monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
				dateFormat: "dd/mm/yy"
			});
		}
	}
	
	$(this.selector).addClass("form")
		.append("<div class='form__field form__field--submit'>" +
		"<input class='form__submit' type='submit' id='submit'>" +
		"</div>");

}