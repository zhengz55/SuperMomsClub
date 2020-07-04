

var images = ["img/rot1.jpg", "img/rot2.jpeg", "img/rot3.jpeg"]

var img = 0;





var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


$(document).ready(function() {

	$.ajax({
		type: "GET",
		url: '/fetchAllProducts',
		success: function(data) {
			let products = document.querySelector('.products')
			$('.products').empty()
	  		for (let product of data) {
	  			products.innerHTML += `<img src=${product.image} width=10% height=100 style="border: 1px solid pink; margin-top: 15px; margin-left: 5%; float: left;">`
	  		}
		},
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