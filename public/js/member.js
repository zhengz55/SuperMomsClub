
const containerAccountAccess = document.querySelector(".container-account-access")

$(document).ready(function() {
	
	let tier = localStorage.getItem("type").replace( /^\D+/g, '')
	let cart = document.createElement("button")
	cart.type = "button"
	cart.innerHTML = "Purchases"
	containerAccountAccess.appendChild(cart)

	let profile = document.createElement("button")
	profile.type = "button"
	profile.innerHTML = "View Profile"
	profile.setAttribute("id", "view-profile")
	containerAccountAccess.appendChild(profile)
	$("#view-profile").click(function() {
		window.location.href = 'userProfile'

	})
	log(tier)

	if (tier > 1) {
		let blog = document.createElement("button")
		blog.type = "button"
		blog.innerHTML = "Edit/Post Blogs"
		containerAccountAccess.appendChild(blog)
	}
	if (tier > 2) {
		let event = document.createElement("button")
		event.type = "button"
		event.setAttribute("id", "add-activity")
		event.innerHTML = "Edit/Post Events"
		containerAccountAccess.appendChild(event)

		$('#add-activity').click(function() {
			if ($("#activity-form").is(":visible")) {

			}
			else {
				$("#activity-form").css("visibility", "visible");
				$("#activity-form").css("display", "block");
			}
		})

		$('#activity-submit').click(function() {
			let event = {
				title: $('#event-title').val(),
				start_date: $('#start-date').val(),
				end_date: $('#end-date').val(),
				start_time: $('#start-time').val(),
				end_time: $('#end-time').val(),
				description: $('#event-description').val(),
				headcount: $('#event-headcount').val(),
				site: $('#event-site').val(),
				member_id: localStorage.getItem("userID"),
				photo: "img/" + $('#photo').val()
			}
			log(event)
			$.ajax({
				type: "POST",
				url: '/activities',
				data: {event: JSON.stringify(event)},
				success: function() {
					log("success")
					$(this).closest('form').find("input[type=text], textarea").val("");
					$("#activity-form").css("visibility", "hidden");
					$("#activity-form").css("display", "none");
				}
			})
		})

		let workshop = document.createElement("button")
		workshop.type = "button"
		workshop.setAttribute("id", "add-workshop")
		workshop.innerHTML = "Create/Edit workshop"
		containerAccountAccess.appendChild(workshop)

		$('#add-workshop').click(function() {
			if ($("#workshop-form").is(":visible")) {

			}
			else {
				$("#workshop-form").css("visibility", "visible");
				$("#workshop-form").css("display", "block");
			}
		})
		$('#workshop-submit').click(function() {
			let ws = {
				name: $('#workshop-name').val(),
				signup_start: $('#workshop-signup-start').val(),
				signup_end: $('#workshop-signup-end').val(),
				link: $('#workshop-link').val(),
				objective: $('#workshop-objective').val(),
				description: $('#workshop-description').val(),
				capacity: $('#workshop-capacity').val(),
				site: $('#workshop-site').val(),
				member_id: localStorage.getItem("userID"),
				image: "img/" + $('#workshop-photo').val()
			}
			log(ws)
			$.ajax({
				type: "POST",
				url: '/workshops',
				data: {workshop: JSON.stringify(ws)},
				success: function() {
					log("success")
					$(this).closest('form').find("input[type=text], textarea").val("");
					$("#workshop-form").css("visibility", "hidden");
					$("#workshop-form").css("display", "none");
				}
			})
		})
	}
	if (tier > 3) {
		let product = document.createElement("button")
		product.type = "button"
		product.setAttribute("id", "add-product")
		product.innerHTML = "Manage Products"

		$('#add-product').click(function() {
			if ($("#product-form").is(":visible")) {

			}
			else {
				$("#product-form").css("visibility", "visible");
				$("#product-form").css("display", "block");
			}
		})

		$('#product-submit').click(function() {
			let product = {
				name: $('#product-name').val(),
				stock: $('#product-stock').val(),
				description: $('#product-description').val(),
				price: $('#product-price').val(),
				photo: "img/" + $('#product-image').val()
			}
			log(product)
			$.ajax({
				type: "POST",
				url: '/products',
				data: {product: JSON.stringify(product)},
				success: function() {
					log("success")
					$(this).closest('form').find("input[type=text], textarea").val("");
					$("#product-form").css("visibility", "hidden");
					$("#product-form").css("display", "none");
				}
			})
		})


		let users = document.createElement("button")
		users.type = "button"
		users.innerHTML = "Manage users"
		containerAccountAccess.appendChild(product)
		containerAccountAccess.appendChild(users)
	}


	$('.x').click(function() {
		$(this).parent().css("visibility", "hidden");
		$(this).parent().css("display", "none");
		// $("#activity-form").css("visibility", "hidden");
		// $("#activity-form").css("display", "none");
	})






	



});

