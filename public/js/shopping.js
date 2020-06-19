var purchases = [];
var products;

$(document).ready(function() {
	$('.signInSlot').load("signup.html .signIn-form");

	purchases = JSON.parse(localStorage.getItem("purchases"))


	$(".signIn-form").submit(function(e) { // signin form
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: '/userLogin',
			data: $(this).serialize(),
			success: function() {
		  		alert(123)
			},
		});
	})


	$(document).ready(function() {
		$.ajax({
			type: "GET",
			url: '/fetchAllProducts',
			success: function(data) {
				log(data)
				products = data;
		  		for (let product of data) {
		  			let div = document.createElement("div")
		  			div.setAttribute("class", "product")

		  			let img = document.createElement("img")
		  			img.setAttribute("class", "product-image")
		  			img.src = product.image

		  			let p1 = document.createElement("p")
		  			p1.setAttribute("id", "price-tag")
		  			p1.innerHTML = "$" + product.price;

		  			let p2 = document.createElement("p")
		  			p2.setAttribute("id", "product-description")
		  			p2.innerHTML = product.description

		  			let x = document.createElement("button")
		  			x.type = "button"
		  			x.innerHTML = "+"
		  			div.appendChild(x)
		  			x.setAttribute("class", "x")


		  			let p3 = document.createElement("p")
		  			p3.setAttribute("id", "product-id")
		  			p3.style.visibility = "hidden";
		  			p3.style.display = "none";
		  			p3.innerHTML = product.id;


		  			div.appendChild(img)
		  			div.appendChild(p1)
		  			div.appendChild(p2)
		  			div.appendChild(p3)
		  			$('.container-top-products').append(div)

		  		}

		  		$('.x').click(function() {
		  			// let items = localStorage.getItem("purchases")
		  			// items = JSON.parse(items)
		  			let item = products.filter(i => i.id === parseInt($(this).parent().find("#product-id").html()))[0]
		  			log(item)
		  			item = {
		  				id: item.id,
		  				image: item.image,
		  				name: item.name,
		  				price: item.price,
		  			}
		  			purchases.push(item)
		  			// items = JSON.stringify(items)
		  			// localStorage.setItem("purchases", items)
		  		})
			},
		});
	})

	$(window).on("unload", function() {
		purchases = JSON.stringify(purchases)
		localStorage.setItem("purchases", purchases)
	})


});

function signIn() { // toggle sign in form visibility
	log('clicked')
	if ($(".signIn-form").is(":visible")) {
		$(".signIn-form").css("visibility", "hidden");
		$(".signIn-form").css("display", "none");
	}
	else {
		$(".signIn-form").css("visibility", "visible");
		$(".signIn-form").css("display", "block");
	}

}