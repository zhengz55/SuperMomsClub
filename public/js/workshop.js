const workshopSlot = document.querySelector('.workshop-slot')

function addWorkshop() {


	let workshop = {
		title: $('#workshop-name').val(),
		start_date: $('#start-date').val(),
		end_date: $('#end-date').val(),
		start_time: $('#start-time').val(),
		end_time: $('#end-time').val(),
		description: $('#workshop-description').val(),
		headcount: $('#workshop-capacity').val(),
		site: $('#workshop-site').val(),
		member_id: localStorage.getItem("userID"),
		photo: "img/" + $('#photo').val(),
		link: $('#link').val()
	}
	log(workshop)



	$.ajax({
		type: "POST",
		url: '/workshops',
		data: { workshop: JSON.stringify(workshop) },
		success: function(data) {
			log(data)
		},
		error: function(data) {
			if (data.status === 400) {
				alert("User not found")
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
		all.innerHTML = "All Workshops"
		all.href = "#"
		$('#secondary-navbar').append(all)
		if (localStorage.getItem("type") === "3" || localStorage.getItem("type") === "4") {
			let myWorkshops = document.createElement("a")
			myWorkshops.setAttribute("id", "my-workshops")
			myWorkshops.innerHTML = "My Workshops"
			myWorkshops.href = "#"
			$('#secondary-navbar').append(myWorkshops)
			// $('#my-workshops').click(loadEvents)


			let postWorkshop = document.createElement("a")
			postWorkshop.setAttribute("id", "post-activity")
			postWorkshop.innerHTML = "Post A Workshop"
			postWorkshop.href = "#"
			postWorkshop.style.float = "right"
			postWorkshop.style.marginRight = "20px"
			$('#secondary-navbar').append(postWorkshop)
			$('#post-activity').click(showForm)
		}
	})

	$.ajax({
		type: "get",
		url: '/fetchWorkshops',
		success: function(data) {
			let options = ["left", "right"]
			let curOption = 0;

			for (workshop of data) {
				log(`.${options[curOption]}`)
				let column = document.querySelector(`.${options[curOption]}`)
				column.innerHTML += `  <div class="workshop">
				    <img width="30%" height="35%" src=${workshop.image} class="workshop-image">
				    <div class="top-right-box">
				      <p class="title">${workshop.name}</p>
				      <p class="date">${parseDate(workshop.signup_start)}</p>
				      <p class="time">${parseDate(workshop.signup_end)}</p>
				    </div>

				    <div class="container-bottom">
				      <p class="site">${workshop.site}</p>
				      <p class="description">${workshop.description}</p>
				      <p class="price">${workshop.price}</p>
				      <button type="button" id="signUp-workshop" value="Sign Up">Attend</button>

				    </div>

				  </div>`
				 if (curOption) {
				 	curOption--;
				 } else {
				 	curOption++;
				 }
			}
		},
		error: function(data) {
			if (data.status === 400) {
				alert("User not found")
			}
		}
	});


});

function showForm() {
	if ($('.workshop-slot').is(':empty')) {
		workshopSlot.innerHTML += `    <div id="activity-form">
      <h4>Activity</h4>
      <br><br>
      <button class="x" type="button">X</button>
      <div class="leftbox">

          <label for="title">Title</label>
          <input type="text" placeholder="Activity Title" id="workshop-name">
          <br><br>
          <label for="start">Start Date</label>
          <input type="date" id="start-date">
          <br><br>
          <label for="end">End Date</label>
          <input type="date" id="end-date">
          <br><br>
          <label for="timestart">Start hour</label>
          <input type="time" id="start-time">
          <br><br>
          <label for="timeend">End hour</label>
          <input type="time" id="end-time">
          <br><br>
          <label for="link">Link</label>
          <input type="text" id="link">



      </div>

      <div class="rightbox">

        <label>Size of Workshop: </label>
        <input type="number" placeholder="Headcount" id="workshop-capacity">
        <br><br>
        <label>Workshop Location: </label>
        <input type="text" placeholder="Site" id="workshop-site">
        <br><br>
        <label id="description">Photo: </label>
        <input id="photo" type="text" placeholder="Photo Src">        <br><br>
        <label>Description: </label>
        <textarea id="workshop-description" rows=5 cols=25></textarea>

      	</div>


        <input class="submit-button" id="workshop-submit" type="button" value="Add Event">



    	</div>`
    	$('.x').click(function() {
			showForm()
		})
		$('#workshop-submit').click(function() {
			addWorkshop()
		})


	} else {
		$('.workshop-slot').empty();
	}
}