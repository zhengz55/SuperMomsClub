const log = console.log



$(document).ready(function(){
	$('.navslot').load("home.html .navbar") // load navbar from homepage
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