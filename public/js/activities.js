// const log = console.log

// const myStorage = window.localStorage


// function configureLoginForm() {
// 	$(".signIn-form").submit(function(e) { // signin form
// 		e.preventDefault();
// 		log(123)
// 		$.ajax({
// 			type: "POST",
// 			url: '/userLogin',
// 			data: $(this).serialize(),
// 			success: function(data) {
// 				log(data)
// 			},
// 			error: function(data) {
// 				if (data.status === 400) {
// 					alert("User not found")
// 				}
// 			}
// 		});
// 	})
// }

$(document).ready(function(){
	// $('.navslot').load("home.html .navbar") // load navbar from homepage
	// $('.signInSlot').load("signup.html .signIn-form", configure);
	// fetch all activities
	$.ajax({
		type: "GET",
		url: '/events',
		success: function(data) {
			log(data)
			for (let event of data) {
				let e = document.createElement("div")
				e.setAttribute("class", "event")

				let imgContainer = document.createElement("div")
				imgContainer.setAttribute("class", "container-image")

				let img = document.createElement("img")

				imgContainer.appendChild(img)
				img.setAttribute("width", "90%")
				img.setAttribute("height", "150px")
				// img.width = "90%";
				// img.height = "150px";
				img.src = "img/profilePic.jpg";

				let p1 = document.createElement("p")
				p1.innerHTML = event.site + ", " + event.member_id;

				let containerDescription = document.createElement("div")
				containerDescription.setAttribute("class", "container-description")

				let h3 = document.createElement("h3")
				h3.innerHTML = event.title;

				let p2 = document.createElement("p")
				p2.innerHTML = event.start_date + ", " + event.start_time + " - " + event.end_date + ", " + event.end_time;

				let p3 = document.createElement("p")
				p3.innerHTML = event.headcount + " people";

				let p4 = document.createElement("p")
				p4.innerHTML = event.description;

				
				imgContainer.appendChild(p1)

				containerDescription.appendChild(h3)
				containerDescription.appendChild(p2)
				containerDescription.appendChild(p3)
				containerDescription.appendChild(p4)

				e.appendChild(imgContainer)
				e.appendChild(containerDescription)

				$('.container-main').append(e)

			}
		},
		error: function(data) {
			if (data.status === 400) {
				alert("something went wrong")
			}
		}
	});


});

// function signIn() { // toggle sign in form visibility
// 	log('clicked')
// 	if ($(".signIn-form").is(":visible")) {
// 		$(".signIn-form").css("visibility", "hidden");
// 		$(".signIn-form").css("display", "none");
// 	}
// 	else {
// 		$(".signIn-form").css("visibility", "visible");
// 		$(".signIn-form").css("display", "block");
// 	}

// }