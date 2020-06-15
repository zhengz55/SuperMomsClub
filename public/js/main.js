const log = console.log

const myStorage = window.localStorage


function configureLoginForm() {
	$(".signIn-form").submit(function(e) { // signin form
		e.preventDefault();
		log(123)
		$.ajax({
			type: "POST",
			url: '/userLogin',
			data: $(this).serialize(),
			success: function(data) {
				log(data)
				localStorage.setItem("userID", data.id)
				localStorage.setItem("email", data.email)
				localStorage.setItem("username", data.username)
				localStorage.setItem("bio", data.bio)
				localStorage.setItem("type", data.type)
				localStorage.setItem("firstname", data.firstname)
				localStorage.setItem("lastname", data.lastname)
				localStorage.setItem("password", data.password)
				localStorage.setItem("interests", data.interests)
				log(localStorage.getItem("userID"), localStorage.getItem("username"), localStorage.getItem("firstname"), localStorage.getItem("lastname"), localStorage.getItem("password"))
			},
			error: function(data) {
				if (data.status === 400) {
					alert("User not found")
				}
			}
		});
	})
}

$(document).ready(function(){
	$('.navslot').load("main.html .navbar") // load navbar from homepage
	$('.signInSlot').load("main.html .signIn-form", configureLoginForm);
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