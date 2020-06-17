
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
	$('#yourbio').text(myStorage.getItem("bio") + myStorage.getItem("password")) // remember to remove this last part
	$('#interests').text(myStorage.getItem("interests"))

	$('#editButton').click(function() {
		if (this.value === "Click To Edit") {
			this.value = "Save";
			for (let span of spans) {
				span.contentEditable = true;
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
					log("success")
				}
			})
		}


	})

	$('.x').click(function() {
		$("#activity-form").css("visibility", "hidden");
		$("#activity-form").css("display", "none");
	})

	$('#add-activity').click(function() {
		if ($("#activity-form").is(":visible")) {

		}
		else {
			$("#activity-form").css("visibility", "visible");
			$("#activity-form").css("display", "block");
		}
	})

	$('.submit-button').click(function() {
		let event = {
			title: $('#event-title').val(),
			start_date: $('#start-date').val(),
			end_date: $('#end-date').val(),
			start_time: $('#start-time').val(),
			end_time: $('#end-time').val(),
			description: $('#event-description').val(),
			headcount: $('#event-headcount').val(),
			site: $('#event-site').val(),
			member_id: localStorage.getItem("userID")
		}
		log(event)
		$.ajax({
			type: "POST",
			url: '/activities',
			data: {event: JSON.stringify(event)},
			success: function() {
				log("success")
				$(this).closest('form').find("input[type=text], textarea").val("");
			}
		})
	})

})