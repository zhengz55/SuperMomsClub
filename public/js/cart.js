let d = {}

var reducer = function(dict, count) {
  if (!dict[count]) {
    dict[count] = 1;
  } else {
    dict[count] = dict[count] + 1;
  }
  return dict;
}

let producContainer = document.querySelector('.products-container')

$(document).ready(function(){
	
	let arr = JSON.parse(localStorage.getItem("purchases"))
	log(arr)
	arr.forEach(item => {
		if (!d[item.id]) {
			d[item.id] = [1, item.price, item.name];
		} else {
			d[item.id][0] += 1;
		}
	})
	log(d)

	for (let item of Object.entries(d)) {
		// producContainer.innerHTML += `
		// <div class="product">
		// 	<ion-icon name="close-circle"></ion-icon>
		// 	<img-src="./images/img1.jepg">
		// 	<span>${item[1][2]}</span>
		// </div>
		// <div class="price">${item[1][1]}</div>
		// <div class="quantity">
		// 	<ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
		// 	<span>${item[1][0]}</span>
		// 	<ion-icon class="increase " name="arrow-dropright-circle"></ion-icon>
		// </div>
		// <div class="total">
		// 	$${item[1][1] * item[1][0]}
		// </div>
		// `


		// $('.product-container').append(product)
	}

});


