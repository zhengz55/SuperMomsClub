



$(document).ready(function(){
	// $('.navslot').load("home.html .navbar") // load navbar from homepage
	// $('.signInSlot').load("signup.html .signIn-form");



	// $(".signIn-form").submit(function(e) { // signin form
	// 	e.preventDefault();
	// 	$.ajax({
	// 		type: "POST",
	// 		url: '/userLogin',
	// 		data: $(this).serialize(),
	// 		success: function() {
	// 	  		alert(123)
	// 		},
	// 	});
	// })
	log(months)

	$.ajax({
		type: "GET",
		url: '/fetchBlogs',
		success: function(data) {

	  		for (let blog of data) {
	  			let photos = blog.photo.split(',')
	  			let b = document.createElement("div");
	  			b.setAttribute("class", "event");

	  			let img = document.createElement("img");
	  			img.style.width = "20%";
	  			img.style.height = "70%";
	  			img.src = photos[0]

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
	  			p2.innerHTML = "foo";
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
	  				localStorage.setItem("blogView", blog.id)
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
		// let text = $('#blog-content').val().replace("\r\n", "<br />\r\n") .replace("\r\n", "<br />\r\n")
		// text = JSON.stringify(text)
		// log(text)
		// text = JSON.parse(text)
		// log(text)

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