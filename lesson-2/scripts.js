// Задание № 3

class GalleryItem {
	constructor(title, preview, full) {
		this.title = title;
		this.preview = preview;
		this.full = full;
	}
	render() {
		return "<div class='gallery-preview__item'><img alt='" + this.title + "' src=" + this.preview + " data-full=" + this.full +"></div>";
	}
}

class Gallery {
	constructor(url){
		this.url = url;
		this.items = [];
		this.fetchGallery();
	}
	fetchGallery(){
		var xhr = new XMLHttpRequest();

		xhr.open("POST", "gallery.json");
		xhr.send();

		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 && xhr.status == 200) {
				var items = JSON.parse(xhr.responseText);
				
				for (var i = 0; i < items.length; i++) {
					this.items.push(new GalleryItem(items[i].title, items[i].preview, items[i].full));
				}
				
				this.show();
			}
		}.bind(this);
	}
	render() {
		var result = "<div class='gallery'><div class='gallery-full'></div><div class='gallery-preview'>";
		
		for (var i = 0; i < this.items.length; i++) {
			result += this.items[i].render();
		}
		
		result += "</div></div>";
		
		return result;
	}
	onClick() {
		var galleryItems = document.getElementsByClassName("gallery-preview__item");
		
		function onClickPreview(e) {
			var url = e.target.getAttribute("data-full");
			var title = e.target.getAttribute("alt");
			showFull(url, title);
		}
		
		function showFull(url, title) {
			document.getElementsByClassName("gallery-full")[0].innerHTML = "<img src=" + url + " alt='" + title + "'>";
		}
		
		for (var i = 0; i < galleryItems.length; i++) {
			galleryItems[i].addEventListener("click", onClickPreview);
		}
		
		showFull(this.items[0].full, this.items[0].title);
	}
	show(){
		document.body.innerHTML = this.render();
		this.onClick();
	}
}

var gallery = new Gallery("gallery.json");


// Задание № 4
/*
var xhr = new XMLHttpRequest(),
	//url = "success.json";
	url = "error.json";

xhr.open("POST", url);
xhr.send();

xhr.onreadystatechange = function(){
	if (xhr.readyState == 4 && xhr.status == 200) {
		var result = JSON.parse(xhr.responseText).result;
		
		if (result == "success") {
			console.log("Успех");
		} else if (result == "error") {
			console.log("Ошибка");
		}
	}
}
*/