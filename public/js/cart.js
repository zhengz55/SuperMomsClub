let d = {}
let totalPrice = 0;

var reducer = function(dict, count) {
  if (!dict[count]) {
    dict[count] = 1;
  } else {
    dict[count] = dict[count] + 1;
  }
  return dict;
}

let productsTable = document.querySelector('.products-table')

$(document).ready(function(){
	
	let arr = JSON.parse(localStorage.getItem("purchases"))
	log(arr)


	for (let item of arr) {
		log(item)
		productsTable.innerHTML += `<tr>
          <td class="product"><img src="${item.image}" width="50%" height="70%"></td>
          <td class="product-name">${item.name}</td>
          <td>$${item.price}</td>
          <td><button type="button" class="minus">-</button><span class="quantity">${item.quantity}</span><button type="button" class="plus">+</button></td>
          <td><span class="quantity">$${item.price * item.quantity}</span></td>
        </tr>`
        totalPrice += item.price * item.quantity

		// $('.product-container').append(product)
	}
	$('#total-price').text(`$${totalPrice}`)
	$('.plus').click(function(e) {
		e.target.parentElement.childNodes[1].innerHTML = parseInt(e.target.parentElement.childNodes[1].innerHTML) + 1;
		updatePrice(e)
	})

	$('.minus').click(function(e) {
		if (e.target.parentElement.childNodes[1].innerHTML === "1") {
			return;
		}
		e.target.parentElement.childNodes[1].innerHTML = parseInt(e.target.parentElement.childNodes[1].innerHTML) - 1;
		updatePrice(e)
	})
});

function updatePrice(e) {
	let k = parseInt(e.target.parentElement.childNodes[1].innerHTML) * parseInt(e.target.parentElement.parentElement.childNodes[5].innerHTML.substring(1))
	e.target.parentElement.parentElement.childNodes[9].innerHTML = `$${k}`
	if (e.target.innerHTML === "+") {
		totalPrice += parseInt(e.target.parentElement.parentElement.childNodes[5].innerHTML.substring(1))
	} else if (e.target.innerHTML === "-") {
		totalPrice -= parseInt(e.target.parentElement.parentElement.childNodes[5].innerHTML.substring(1))
	} else {
		alert("This cant happen!")
	}
	log(totalPrice)

	$('#total-price').text(`$${totalPrice}`)


}


