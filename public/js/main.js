const log = console.log

const myStorage = window.localStorage

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let signInSlot = document.querySelector('.signInSlot')

function parseDate(ts) {
	return months[parseInt(ts.split("-")[1]) - 1] + " " + ts.split("-")[2].split("T")[0] + ", " + ts.split("T")[1].split(":")[0] + ":" + ts.split("T")[1].split(":")[1]
}


function configureLoginForm() {
	$(".signIn-form").submit(function(e) { // signin form

		e.preventDefault();
		$.ajax({
			type: "POST",
			url: '/userLogin',
			data: $(this).serialize(),
			success: function(data) {
				log(data)
				let arr = []
				localStorage.setItem("userID", data.memberid)
				localStorage.setItem("email", data.email)
				localStorage.setItem("username", data.username)
				localStorage.setItem("bio", data.bio)
				localStorage.setItem("type", data.type)
				localStorage.setItem("firstname", data.firstname)
				localStorage.setItem("lastname", data.lastname)
				localStorage.setItem("password", data.password)
				localStorage.setItem("interests", data.interests)
				localStorage.setItem("purchases", JSON.stringify(arr))
				window.location.href = "userProfile";
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
	$('.navslot').load("main.html #main-navbar") // load navbar from homepage
	$('.signInSlot').load("main.html .signIn-form", configureLoginForm);

	// write here


});

function signIn() { // toggle sign in form visibility

	if ($('.signInSlot').is(':empty')) {
		signInSlot.innerHTML += `      <form class="signIn-form">
        
        <h3 style="margin-left: 125px; margin-top: 15px;"><img src="/img/heart.png" height="50" width="50" />Sign In</h3>
        <div class="input-container-signin">
<!--             <label class="input-name-text-signin" for="company">Username</label> -->
            <input class="input-text-box-signin" type="text" placeholder="Enter username" name="username" minlength="5" required>
            </div>
         <div class="input-container-signin">
<!--             <label class="input-name-text-signin" for="confirm">Password</label> -->
            <input class="input-text-box-signin" type="password" placeholder="Enter password" name="password" minlength="5" required>
            </div>

            <input class="button" type="submit" value="Sign In" id="signin-button">

            <p style="text-align: center;">Have not an account yet? <a href="signup">Sign Up</a></p>

      </form>`
      	configureLoginForm();
	}
	else {
		$('.signInSlot').empty()
	}
	// log('clicked')
	// if ($(".signIn-form").is(":visible")) {
	// 	$(".signIn-form").css("visibility", "hidden");
	// 	$(".signIn-form").css("display", "none");
	// }
	// else {
	// 	$(".signIn-form").css("visibility", "visible");
	// 	$(".signIn-form").css("display", "block");
	// }


}