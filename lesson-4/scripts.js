$(document).ready(function(){
	// Задание № 1
		
	$(".tab__title:eq(0)").addClass("tab__title--active");
	$(".tab__content:eq(0)").show();
	
	$(".tab__title").click(function(){
		if (!$(this).hasClass("tab__title--active")) {
			$(".tab__title--active").removeClass("tab__title--active");
			$(".tab__content:visible").hide();
			
			$(this).addClass("tab__title--active");
			var pos = $(this).index();
			$(".tab__content:eq(" + pos + ")").fadeIn("500");
		}
	})	

	// Задание № 2 и № 3

	var cities;
	
	$.ajax({
		url: "cities.json",
		dataType: "json",
		success: function(data){
			cities = data;
			
			$(".input-wrapper").append("<ul class='cities'></ul>");
			
			data.forEach(function(item){
				$(".cities").append("<li class='cities__item'>" + item + "</li>");
			})
			
			$(".cities").click(function(e){
				if ($(e.target).hasClass("cities__item")) {
					if (!$(e.target).attr("data-no-select")) {	
						$('.input').val($(e.target).text());
						$(".cities").slideUp();
					}
				} else if ($(e.target).parent(".cities__item")) {
					if (!$(e.target).parent().attr("data-no-select")) {
						$('.input').val($(e.target).parent().text());
						$(".cities").slideUp();
					}
				}
			})
		}
	})
	
	$(".input").keyup(function(){
		var val = $(this).val();
		
		if (val.length > 2) {
			$(".cities").html("");
			
			cities.forEach(function(item){
				val = "(" + val + ")";
				
				var regexp = new RegExp(val, "i");
				
				if (regexp.test(item)) {	
					item = item.replace(regexp, "<b>$1</b>");
					
					$(".cities").append("<li class='cities__item'>" + item + "</li>");
				}
			})					
			
			if (!$(".cities__item").length) {
				$(".cities").append("<li class='cities__item cities__item--not-found' data-no-select='yes'><b>Ничего не найдено</b></li>");
			}
			
			$(".cities").slideDown();			
		} else {
			$(".cities").slideUp();			
		}
	})
})