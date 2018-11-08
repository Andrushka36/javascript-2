<?php
	require_once('php/config.php');
?>

<!doctype html>
<html>
<head>
    <head>
		<meta charset="utf-8">
		<title>Домашнее задание № 4 к 6-ому уроку</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="task4.js"></script>
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<style>
			body {
				font: 14px Cambria;
			}
			
			img {
				max-width: 100%;
			}
			
			#products, #cart {
				width: 630px;
				margin: 0 auto;				
			}
			
			#products {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}
			
			#cart {
				text-align: right;
				margin-bottom: 40px;
				padding: 10px 20px;
				box-sizing: border-box;
				position: relative;
			}
			
			.product-item {
				flex-basis: 300px;
			}
			
			.product-item__title {
				font-size: 18px;
			}
			
			.product-item__button {
				display: inline-block;
			}
			
			.product-item__button + .product-item__button:before {
				content: "|";
				margin: 0 7px 0 5px;
			}
			
			.mark-wrapper {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px dashed #000;
				opacity: 0.5;
			}
			
			.mark {
				font-size: 24px;
			}
			
		</style>
</head>
<body>
	<div id="cart">
		<p>Товаров: <span class="cart__count"></span></p>
		<p>Сумма: <span class="cart__price"></span></p>
		<a href="#" class="cart_clear">Очистить</a>
	</div>
	<div id="products">
		<?php foreach ( $products as $id => $product ) { ?>
		<div class="product-item product-item--<?php echo $id ?>" data-product-item="<?php echo $id ?>">
			<img class="product-item__image" src="<?php echo $product['image'] ?>" alt="<?php echo $product['name'] ?>">
			<h2 class="product-item__title"><?php echo $product['name'] ?></h2>
			<p>Цена: <?php echo $product['price'] ?> руб.</p>
			<p>В корзине: <span class="product-item__count"></span></p>
			<p>
				<a href="#" class="product-item__button product-item__button--add" data-id="<?php echo $id ?>">Купить</a> 
				<a href="#" class="product-item__button product-item__button--remove" data-id="<?php echo $id ?>">Удалить</a>
			</p>
		</div>
		<?php } ?>
	</div>
</body>
</html>