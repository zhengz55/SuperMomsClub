


const spans = document.getElementsByTagName("span")



$(document).ready(function() {
	$('#profile-name').text(myStorage.getItem("firstname") + " " + myStorage.getItem("lastname") + "' Profile")
	$('#email').text(myStorage.getItem("email"))
	$('#membership').text(myStorage.getItem("type"))
	$('#yourbio').text(myStorage.getItem("bio"))
	$('#interests').text(myStorage.getItem("interests"))

	$.ajax({
		type: "POST",
		url: '/fetchUser',
		data: { user: localStorage.getItem("viewProfile") },
		success: function(data) {
			log(data)
				$('#profile-name').text(`${data.firstname} ${data.lastname}'s Profile`) 
				$('#email').text(data.email)
				$('#membership').text(data.type)
				$('#yourbio').text(data.bio)
				$('#interests').text(data.interests)

		},
		error: function(data) {
			if (data.status === 400) {
				alert("User not found")
			}
		}
	});

})