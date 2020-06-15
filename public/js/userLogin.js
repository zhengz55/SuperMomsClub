const log = console.log



$(document).ready(function(){
	$('#navslot').load("home.html .navbar") // load navbar from homepage

	$("#signup-form").submit(function(e) {  // submit action to create new user
		e.preventDefault()
		$.ajax({
			type: "POST",
			url: '/users',
			data: $(this).serialize(),
			success: function() {
		  		alert(123)
			},
		});
		// const request = new Request(url, {
  //       	method: "POST", 
  //       	body: string,
  //       	headers: {
  //           	'Accept': 'application/json, text/plain, */*',
  //           	'Content-Type': 'application/json'
  //       	},
  //       });
  //       fetch(request).then((data) => {
  //       	alert("success")
  //       })
	})

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