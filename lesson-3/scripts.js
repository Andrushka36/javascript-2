// Задание № 1-2

var text = "'Isn't this game really cool' - he asked.\nShe said: 'Well, it's so hard and I can't pass the first level!'";

pattern = /\B'|'\B/g;

var result = text.replace(pattern, "\"");

console.log(result);

// Задание № 3

/*window.addEventListener("load", onWindowLoad);

function onWindowLoad() {
	document.getElementById("submit").addEventListener("click", onSubmitClick);
	
	function onSubmitClick() {		
		check.run(pattern);
	}
	
	pattern = [{
		id: "name",
		pattern: /^[a-zA-Zа-яА-Я]+$/,
		message: "Имя должно содержать только буквы"
	}, {
		id: "phone",
		pattern: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
		message: "Телефон должен быть вида +7(ххх)ххх-хххх"
	},{
		id: "mail",
		pattern: /^my[-.]?mail@mail.ru$/,
		message: "E-mail не корректен"
	},{
		id: "message",
		pattern: /[^]/,
		message: "Данное поле не может быть пустым"
	}]
	
	var check = {
		run: function(pattern) {
			var result, input, message;
			
			for (var i = 0; i < pattern.length; i++) {
				input = document.getElementById(pattern[i].id);
				result = pattern[i].pattern.test(input.value);
				
				if (!result) {					
					input.classList.add("form__invalid-value");
					
					if (input.value) {
						message = pattern[i].message;
					} else {
						message = "Данное поле не может быть пустым";
					}
					
					if (input.parentNode.children.length == 1) {
						input.parentNode.innerHTML += "<div class='form__error-message'>" + message + "</div>";
					} else {
						input.parentNode.children[1].innerHTML = message;
					}
				} else {
					if (input.classList.contains("form__invalid-value")) {
						input.classList.remove("form__invalid-value");
						input.parentNode.children[1].remove();
					}
				}
			}
		}
	}
}*/