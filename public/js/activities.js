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
	$('.navslot').load("home.html .navbar") // load navbar from homepage
	$('.signInSlot').load("signup.html .signIn-form", configure);


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