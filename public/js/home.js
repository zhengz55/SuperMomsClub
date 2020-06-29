// const log = console.log


// const homeImg = document.querySelector("#image-home")

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


	// homeImg.src = images[img];

	// setInterval(function() {
	// 	if (img === 2) {
	// 		img = 0;
	// 	} else {
	// 		img++;
	// 	}
	// 	homeImg.src = images[img]
	// }, 5000)









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