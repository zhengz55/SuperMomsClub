
const comments = document.querySelector('.comments')


$(document).ready(function(){
	var id = localStorage.getItem("blogView")
	log(id)
	$.ajax({
		type: "GET",
		url: '/blog/' + id,
		success: function(data) {
			
			let blog = data[0]
			let photos = blog.photo.split(',')
			$('.container-text').html(blog.content.replace(/\n/g, '<br />'));
			// log(blog.content.match(/\n/g).length)
			$('#blog-title').html(blog.title)
			// $('.container-images').empty();
			if (photos[0]) {
				let img1 = document.createElement("img")
				img1.setAttribute("id", "img-1")
				img1.src = photos[0]
				$('.container-images').append(img1);
				$('#img-1').width('40%')
				$('#img-1').height('280')
			}
			if (photos[1]) {
				let img2 = document.createElement("img")
				img2.setAttribute("id", "img-2")
				img2.src = photos[1]
				$('.container-images').append(img2);
				$('#img-2').width('40%')
				$('#img-2').height('280')
			}

		},
	});

	$('.post-button').click(function() {
		let comment = {
			member_name: localStorage.getItem("username"),
			member_id: localStorage.getItem("userID"),
			content: $('#comment-text').val(),
			blogID: id,
		}
		$.ajax({
			type: "POST",
			url: '/comments/',
			data: { comment: JSON.stringify(comment) },
			success: function() {
				alert("success")
			}

		});

	})

	$.ajax({
		type: "GET",
		url: '/comment/' + id,
		success: function(data) {
			$('.comments').empty();
			for (comment of data) {
				let ts = months[parseInt(comment.ts.split("-")[1]) - 1] + " " + comment.ts.split("-")[2].split("T")[0] + ", " + comment.ts.split("T")[1].split(":")[0] + ":" + comment.ts.split("T")[1].split(":")[1]
				comments.innerHTML += `<p><span>${comment.member_name}: </span>${comment.content}<span id="ts">${ts}</span></p>`
			}
		}
	})









});
