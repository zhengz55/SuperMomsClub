
log($(".gallery"))

const spans = document.getElementsByTagName("span")

// const email = document.querySelector("#email");
// const membership = document.querySelector("#membership")
// const bio = document.querySelector("#yourbio")
// const interests = document.querySelector("#interests")


$(document).ready(function() {
	$('#profile-name').text(myStorage.getItem("firstname") + " " + myStorage.getItem("lastname") + "' Profile")
	$('#email').text(myStorage.getItem("email"))
	$('#membership').text(myStorage.getItem("type"))
	$('#yourbio').text(myStorage.getItem("bio"))
	$('#interests').text(myStorage.getItem("interests"))
	$("#profile-img").attr("src",`img/${myStorage.getItem("photo")}`);

	if (myStorage.getItem("type") !== "4") {
		$('#add-product').css("visibility", "hidden")
	}

	$('#add-activity').css("visibility", "hidden")

	$('#photo-button').click(() => {
		let photo = $('#photo-src').val();
		$.ajax({
			type: "PATCH",
			url: '/photo',
			data: {photo: JSON.stringify(photo), id:localStorage.getItem("userID")},
			success: function() {
				$('#profile-img').attr("src", `img/${photo}`)
			}
		})

	})

	$('#editButton').click(function() {
		if (this.value === "Click To Edit") {
			this.value = "Save";
			for (let span of spans) {
				if (span.id !== "membership") {
					span.contentEditable = true;
				}
				

			}

		} else {
			this.value = "Click To Edit";
			for (let span of spans) {
				span.contentEditable = false;
			}
			let user = {
				id: localStorage.getItem("userID"),
				email: $('#email').text(),
				type: $('#membership').text(),
				bio: $('#yourbio').text(),
				interests: $('#interests').text()
			}
			log(user)
			$.ajax({
				type: "PATCH",
				url: '/userProfile',
				data: {user: JSON.stringify(user)},
				success: function() {
					localStorage.setItem("email", user.email)
					localStorage.setItem("bio", user.bio)
					localStorage.setItem("interests", user.interests)
					window.location.href = "userProfile"
				}
			})
		}


	})

	$('.x').click(function() {
		$(this).parent().css("visibility", "hidden");
		$(this).parent().css("display", "none");
		// $("#activity-form").css("visibility", "hidden");
		// $("#activity-form").css("display", "none");
	})

	$('#add-activity').click(function() {
		if ($("#activity-form").is(":visible")) {

		}
		else {
			$("#activity-form").css("visibility", "visible");
			$("#activity-form").css("display", "block");
		}
	})

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

})