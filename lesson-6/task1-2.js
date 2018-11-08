$(document).ready(function(){	
	pattern = [{
		name: "Имя",
		id: "name",
		pattern: /^[a-zA-Zа-яА-Я]+$/,
		message: "Имя должно содержать только буквы"
	}, {
		name: "Телефон",
		id: "phone",
		pattern: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
		message: "Телефон должен быть вида +7(ххх)ххх-хххх"
	},{
		name: "E-mail",
		id: "mail",
		pattern: /^[A-Za-z_.-]+@[a-z]+\.[a-z]{2,3}$/,
		message: "E-mail не корректен"
	},{
		name: "Дата рождения",
		id: "date",
		pattern: /^\d{2}\/\d{2}\/\d{4}$/,
		message: "Дата рождения должна быть в формате ДД.ММ.ГГГГ"
	},{
		name: "Сообщение",
		id: "message",
		pattern: /[^]/,
		message: "Данное поле не может быть пустым"
	}];
	
	$("#submit").click(function(){
		check.run(pattern);
	});
	
	$("#date").datepicker({
		firstDay: 1,
		dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		dateFormat: "dd/mm/yy"
	});
	
	var check = {
		run: function(pattern) {
			var input, value, result, message = '';
			
			for (var i = 0; i < pattern.length; i++) {
				input = $("#" + pattern[i].id);
				value = input.val();
				
				result = pattern[i].pattern.test(value);
				
				if (!result) {					
					input.addClass("form__invalid-value");
					input.effect("shake");
					
					if (value) {
						message += "<p>Ошибка в поле \"" + pattern[i].name +"\". " + pattern[i].message + ".</p>";
					} else {
						message += "<p>Ошибка в поле \"" + pattern[i].name +"\". Данное поле не может быть пустым.</p>";
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
	}	
})