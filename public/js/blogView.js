



$(document).ready(function(){
	let id = localStorage.getItem("blogView")
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
});
