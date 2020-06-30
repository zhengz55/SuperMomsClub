var purchases = []


$(document).ready(function() {
	
	let product = JSON.parse(localStorage.getItem("product"))
	log(product)

	$('#product-name').text("Name")
	$('#product-price').text(`$${product.price}`)
	$('#product-description').text(product.description)
	if (product.stock > 0) {
		$('#product-stock').text("In Stock")
	} else {
		$('#product-stock').text("Out of Stock")
	}

	let img = document.createElement("img")
	$('.container-image').append(img)
	img.src = product.image;
	img.width = 300
	img.height = 200

	$('#add-to-cart').click(function() {
		purchases = JSON.parse(localStorage.getItem("purchases"))
		log(purchases)

		let duplicates = purchases.filter(i => i.name === product.name)
		if (duplicates[0]) {
			let dup = duplicates[0]
			let index = purchases.indexOf(dup)
			let k = +dup.quantity + +$('#product-quantity').val()
			dup.quantity = k.toString(10)
			log(typeof dup.quantity, dup.quantity, index)
			purchases[index] = dup
			localStorage.setItem("purchases", JSON.stringify(purchases))
			return;
		}


		let item = {
			name: product.name,
			price: product.price,
			image: product.image,
			description: product.description,
			quantity: $('#product-quantity').val(),
		}
		purchases.push(item)
		localStorage.setItem("purchases", JSON.stringify(purchases))
	})

	$('#back-to-shopping').click(function() {
		window.location.href = "shopping"
	})


});

