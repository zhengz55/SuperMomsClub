


function createBlogs(data) {
	$('.container-main').empty()
	for (let blog of data) {
		let photos = blog.photo.split(',')
		let b = document.createElement("div");
		b.setAttribute("class", "event");

		let img = document.createElement("img");
		img.style.width = "20%";
		img.style.height = "70%";
  		try {
			img.src = photos[0]
		} catch(err) {
			alert("Image not Found")
		}

		let d = document.createElement("div");
		d.setAttribute("class", "container-description")
		let h3 = document.createElement("h3")
		h3.innerHTML = blog.title

		let p1 = document.createElement("p")
		let ts = blog.ts
		let a = document.createElement("a")
		a.style.marginLeft = "0px";
		a.href = "#"
		a.innerHTML = months[parseInt(ts.split("-")[1]) - 1] + " " + ts.split("-")[2].split("T")[0] + ", " + ts.split("T")[1].split(":")[0] + ":" + ts.split("T")[1].split(":")[1]
		
		p1.innerHTML = "Posted on: "
		p1.appendChild(a)
		let p2 = document.createElement("p")
		p2.innerHTML = blog.username;
		let p3 = document.createElement("p")
		p3.innerHTML = blog.content;

		d.appendChild(h3)
		d.appendChild(p1);
		d.appendChild(p2)
		d.appendChild(p3)

		b.appendChild(img)
		b.appendChild(d)

		$('.container-main').append(b);

		h3.onclick = function() {
			localStorage.setItem("blogView", blog.blogid)
			window.location.href = "blogView"
		}

	}
}

function loadBlogs(e) {

	let req_url = e.target.innerHTML === "All Blogs" ? '/fetchBlogs' : '/blogs/' + localStorage.getItem("userID")

	$.ajax({
		type: "GET",
		url: req_url,
		success: function(data) {
			log(data)
			createBlogs(data)
		},
		error: function(data) {
			if (data.status === 400) {
				alert("something went wrong")
			}
		}
	});


}


$(document).ready(function(){
	// $('.navslot').load("home.html .navbar") // load navbar from homepage
	// $('.signInSlot').load("signup.html .signIn-form");
	$('.secondary-navslot').load("main.html #secondary-navbar", function() {
		let nav = document.querySelector("#secondary-navbar")
		$('#secondary-navbar').empty()
		let all = document.createElement("a")
		all.setAttribute("id", "all-activities")
		all.innerHTML = "All Blogs"
		all.href = "#"



		nav.appendChild(all)
		if (localStorage.getItem("type") === "Tier 3" || localStorage.getItem("type") === "Tier 4") {
			let myBlogs = document.createElement("a")
			myBlogs.setAttribute("id", "all-activities")
			myBlogs.innerHTML = "My posts"
			myBlogs.href = "#"
			nav.appendChild(myBlogs)
		}

		let secondaryElements = nav.querySelectorAll("a")
		for (item of secondaryElements) {
			item.onclick = loadBlogs
		}

		$('#post-comment-button').click(function() { // working from here
			let message = {
				content = $('.input-comment').val(),
				id = localStorage.getItem("userID")
			}

			$.ajax({
				type: "POST",
				url: '/messages',
				data: { message: JSON.stringify(message) }
				success: function(resp) {
					alert(resp)
				},
				error: function(data) {
					if (data.status === 400) {
						alert("something went wrong")
					}
				}
			});
		})

		// $.ajax({
		// 	type: "GET",
		// 	url: '/leftjoin',
		// 	success: function(data) {
		// 		log(data)
		// 	},
		// 	error: function(data) {
		// 		if (data.status === 400) {
		// 			alert("something went wrong")
		// 		}
		// 	}
		// });




	})



	log(months)

	$.ajax({
		type: "GET",
		url: '/fetchBlogs',
		success: function(data) {

	  		for (let blog of data) {
	  			log(blog)
	  			let photos = blog.photo.split(',')
	  			let b = document.createElement("div");
	  			b.setAttribute("class", "event");

	  			let img = document.createElement("img");
	  			img.style.width = "20%";
	  			img.style.height = "70%";
	  			try {
	  				img.src = photos[0]
	  			} catch(err) {
	  				alert("Image not Found")
	  			}
	  			

	  			let d = document.createElement("div");
	  			d.setAttribute("class", "container-description")
	  			let h3 = document.createElement("h3")
	  			h3.innerHTML = blog.title

	  			let p1 = document.createElement("p")
	  			let ts = blog.ts
	  			let a = document.createElement("a")
	  			a.style.marginLeft = "0px";
	  			a.href = "#"
	  			a.innerHTML = months[parseInt(ts.split("-")[1]) - 1] + " " + ts.split("-")[2].split("T")[0] + ", " + ts.split("T")[1].split(":")[0] + ":" + ts.split("T")[1].split(":")[1]
	  			
	  			p1.innerHTML = "Posted on: "
	  			p1.appendChild(a)

	  			let p2 = document.createElement("p")
	  			p2.innerHTML = blog.username;
	  			let p3 = document.createElement("p")
	  			p3.innerHTML = blog.content;

	  			d.appendChild(h3)
	  			d.appendChild(p1);
	  			d.appendChild(p2)
	  			d.appendChild(p3)

	  			b.appendChild(img)
	  			b.appendChild(d)

	  			$('.container-main').append(b);

	  			h3.onclick = function() {
	  				localStorage.setItem("blogView", blog.blogid)
	  				window.location.href = "blogView"
	  			}

	  		}
		},
	});



	$("#post-blog").click(function() {
		let photos = []
		if ($('#photo-src').val()) {
			photos.push('img/' + $('#photo-src').val())
		}
		if ($('#photo-src-2').val()) {
			photos.push('img/' + $('#photo-src-2').val())
		}
		log(photos)
		log()
		let blog = {
			title: $('#blog-header').val(),
			content: $('#blog-content').val(),
			photo: photos,
			member_id: localStorage.getItem("userID")
		}


		$.ajax({
			type: "POST",
			url: '/blogs',
			data: { blog: JSON.stringify(blog) },
			success: function() {
		  		alert(123)
			},
		});
	})



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