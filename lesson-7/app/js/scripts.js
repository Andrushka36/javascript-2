$(document).ready(function(){
	var form = new Form("json/config.json");	
	form.show("#form");
	
	var validate = new Validate();	
	validate.run(form);
})