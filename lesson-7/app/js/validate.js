var Validate = function() {
	this.config = [];
}

Validate.prototype.run = function(form) {
	$(document).on("click", form.selector + " #submit",function(){
		if (!this.config.length) {
			this.config = form.fields;
		}
		
		this.check();
	}.bind(this))
}

Validate.prototype.check = function() {
	if ($("#error").dialog("isOpen")) {
		$("#error").dialog("close");
	}
	
	var message = "";
	
	for (var i = 0; i < this.config.length; i++) {		
		var input = $("#" + this.config[i].id);
		var value = input.val();
		
		var regExp = new RegExp(this.config[i].pattern);			
		var result = regExp.test(value);
		
		if (!result) {					
			input.addClass("form__invalid-value");
			input.effect("shake");
				
			if (value) {
				message += "<p>Ошибка в поле \"" + this.config[i].name +"\". " + this.config[i].errorMessage + ".</p>";
			} else {
				message += "<p>Ошибка в поле \"" + this.config[i].name +"\". Данное поле не может быть пустым.</p>";
			}
		} else {
			if (input.hasClass("form__invalid-value")) {
				input.removeClass("form__invalid-value");
			}
		}
	}
	
	if (message) {
		if (!$("#error").length) {
			$("body").append("<div id='error' title='Ошибка при заполнении полей формы'>" + message + "</div>")
		} else {
			$("#error").html(message);
		}				
			
		$("#error").dialog({
			width: 600
		});
	}
}