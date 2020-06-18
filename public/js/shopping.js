

$(document).ready(function() {
	$('.signInSlot').load("signup.html .signIn-form");


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

		  			// let x = document.createElement("button")
		  			// x.setAttribute("class", "x")
		  			// div.appendChild(x)


		  			div.appendChild(img)
		  			div.appendChild(p1)
		  			div.appendChild(p2)
		  			$('.container-top-products').append(div)

		  		}
			},
		});
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