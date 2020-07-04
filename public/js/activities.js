var allUsers = [];

$.ajax({
	type: "GET",
	url: '/users',
	success: function(data) {
		allUsers = data;
		log(allUsers)
	}
})


function createEvents(data) {
	log(data)

	$('.container-main').empty()
	for (let event of data) {
		let member = allUsers.filter(u => u.memberid === event.member_id).map(i => i.username)[0]
		let r_box = document.createElement("div")
		r_box.setAttribute("class", "r-box")
		r_box.innerHTML = `<p>Currently Signed Up: <span>5</span</p><button class="event-sign-up">Sign Up</button>`


		let e = document.createElement("div")
		e.setAttribute("class", "event")

		let imgContainer = document.createElement("div")
		imgContainer.setAttribute("class", "container-image")

		let img = document.createElement("img")

		imgContainer.appendChild(img)
		img.setAttribute("width", "90%")
		img.setAttribute("height", "150px")
		img.src = event.photo;

		let p1 = document.createElement("p")
		p1.innerHTML = event.site + ", " + member;

		let containerDescription = document.createElement("div")
		containerDescription.setAttribute("class", "container-description")

		let h3 = document.createElement("h3")
		h3.innerHTML = event.title;

		let p2 = document.createElement("p")
		p2.innerHTML = `${event.start_date}, ${event.start_time} to ${event.end_date}, ${event.end_time}`;


		let p3 = document.createElement("p")
		p3.innerHTML = `${event.headcount} people`;

		let p4 = document.createElement("p")
		p4.innerHTML = event.description;

		
		imgContainer.appendChild(p1)

		containerDescription.appendChild(h3)
		containerDescription.appendChild(p2)
		containerDescription.appendChild(p3)
		containerDescription.appendChild(p4)

		e.appendChild(imgContainer)
		e.appendChild(containerDescription)

		e.appendChild(r_box)


		$('.container-main').append(e)



	}
}

function loadEvents(e) {
	log(e.target.innerHTML)
	let req_url = e.target.innerHTML === "All Activities" ? '/events' : '/event/' + localStorage.getItem("userID")
	log(req_url)
	$.ajax({
		type: "GET",
		url: req_url,
		success: function(data) {
			createEvents(data)
		},

		error: function(data) {
			if (data.status === 400) {
				alert("something went wrong")
			}
		}
	});
}

$(document).ready(function(){



	$('.secondary-navslot').load("main.html #secondary-navbar", function() {
		let nav = document.querySelector("#secondary-navbar")
		$('#secondary-navbar').empty()
		let all = document.createElement("a")
		all.setAttribute("id", "all-activities")
		all.innerHTML = "All Activities"
		all.href = "#"
		$('#secondary-navbar').append(all)
		log(localStorage.getItem("type"))
		if (localStorage.getItem("type") === "3" || localStorage.getItem("type") === "4") {
			let myActivities = document.createElement("a")
			myActivities.setAttribute("id", "my-activities")
			myActivities.innerHTML = "My Activities"
			myActivities.href = "#"
			$('#secondary-navbar').append(myActivities)
			$('#my-activities').click(loadEvents)


			let postActivity = document.createElement("a")
			postActivity.setAttribute("id", "post-activity")
			postActivity.innerHTML = "Post an Event"
			postActivity.href = "#"
			postActivity.style.float = "right"
			postActivity.style.marginRight = "20px"
			$('#secondary-navbar').append(postActivity)
			$('#post-activity').click(showActivityForm)
			$('.x').click(function() {
				$(this).parent().css("visibility", "hidden");
				$(this).parent().css("display", "none");
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



		}

		
		$('#all-activities').click(loadEvents)


	})
	// fetch all activities
	$.ajax({
		type: "GET",
		url: '/events',
		success: function(data) {
			log(data)
			createEvents(data)

		},
		error: function(data) {
			if (data.status === 400) {
				alert("something went wrong")
			}
		}
	});


});

function showActivityForm() {
	if ($("#activity-form").is(":visible")) {
		$("#activity-form").css("visibility", "hidden");
		$("#activity-form").css("display", "none");
	}
	else {
		$("#activity-form").css("visibility", "visible");
		$("#activity-form").css("display", "block");
	}
}

