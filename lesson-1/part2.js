// Задания № 1 и № 2

var config = [{
	href: '/',
	name: "Главная"
}, {
	href: '/catalog',
	name: "Каталог"
}, {
	href: '/gallery',
	name: "Галерея",
	items: [{
			href: '/1',
			name: "Фото 1"
		}, {
			href: '/2',
			name: "Фото 2"
		}],
}];

class Container {
	remove(){
		var element = document.getElementById(this.id);		
		element.parentNode.removeChild(element);
	}
};

class Menu extends Container {
	constructor(id, config){
		super();
		this.id = id;
		this.items = [];
		this.config = config;
	}
	createItems(){
		for (let i = 0; i < this.config.length; i++) {
			this.items.push(new MenuItem(this.id +'-item-' + i, this.config[i].href, this.config[i].name));
		}
	}
	create(){
		document.write(this.render());
	}
	render(){
		this.createItems();
		let result = '<ul id="' + this.id + '">';

		for (let i = 0; i < this.items.length; i++) {
			result += this.items[i].render();
		}

		result += '</ul>';
		return result;
	}
};

class MenuItem extends Container {
	constructor(id, href, name){
		super();
		this.id = id;
		this.href = href;
		this.name = name;
	}
	render(){
		return '<li id="'+  this.id + '"><a href="' + this.href + '">' + this.name + '</a></li>';
	}
}

class MenuItemWithSubMenu extends Container {
	constructor(id, href, name, items) {
		super();
		this.id = id;
		this.href = href;
		this.name = name;
		this.items = items;
	}
	render(){	
		let subMenu = new Menu(this.id + "-sub-menu", this.items);
		return '<li id="'+  this.id + '"><a href="' + this.href + '">' + this.name + '</a>' + subMenu.render() + '</li>';
	}
}

class MenuWithSubMenu extends Menu {
	createItems(){
		for (let i = 0; i < this.config.length; i++) {
			if (config[i].items) {
				this.items.push(new MenuItemWithSubMenu(this.id +'-item-' + i, this.config[i].href, this.config[i].name, this.config[i].items));
			} else {
				this.items.push(new MenuItem(this.id +'-item-' + i, this.config[i].href, this.config[i].name));
			}
		}
	}
}

let menu = new MenuWithSubMenu("main-menu", config);

//menu.create();

//menu.remove();

//menu.items[1].remove();

// Задание № 3

class Hamburger {
	constructor(size, stuffing) {
		this.calories = {
			small: 20,
			large: 40,
			cheese: 20,
			salad: 5,
			potato: 10,
			mayo: 5,
			spice: 0
		};
		this.price = {
			small: 50,
			large: 100,
			cheese: 10,
			salad: 20,
			potato: 15,
			mayo: 20,
			spice: 15
		}
		this.size = size;
		this.stuffing = stuffing;
		this.toppings = [];
		this.totalCalories = 0;
		this.totalPrice = 0;
		this.calculateCalories();
		this.calculatePrice();
	}
	getSize() {
		return this.size;
	}
	getStuffing(){
		return this.stuffing;
	}
	getToppings(){
		return (this.toppings.length) ? this.toppings : 'Нет добавок';
	}
	calculateCalories(){
		this.totalCalories = this.calories[this.size] + this.calories[this.stuffing];
		
		this.toppings.forEach(function(elem){
			this.totalCalories += this.calories[elem];
		}, this);	
	}
	getCalories(){
		return this.totalCalories;
	}
	calculatePrice(){
		this.totalPrice = this.price[this.size] + this.price[this.stuffing];
		
		this.toppings.forEach(function(elem){
			this.totalPrice += this.price[elem];
		}, this);	
	}
	getPrice(){
		return this.totalPrice;
	}
	addTopping(){
		for (var i = 0; i < arguments.length; i++) {
			if (this.toppings.indexOf(arguments[i]) == -1) {
				this.toppings.push(arguments[i]);
			}
		};
		
		this.calculateCalories();
		this.calculatePrice();
	}
	removeTopping(topping){
		var index = this.toppings.indexOf(topping);
		
		if (index != -1) {
			this.toppings.splice(index, 1);
		};		
		
		this.calculateCalories();
		this.calculatePrice();
	}
}

let hamburger = new Hamburger('large', 'cheese');

//console.log(hamburger.getToppings());

//console.log(hamburger.getCalories());

//hamburger.addTopping("mayo");

//console.log(hamburger.getToppings());

//console.log(hamburger.getCalories());