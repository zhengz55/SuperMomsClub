let d = {}
let totalPrice = 0;

			// log(e.target.parentElement.parentElement)
			// let price = e.target.parentElement.childNodes[1].innerHTML;
			// price = parseInt(price);


function roundToXDigits(value, digits) {
    if(!digits){
        digits = 2;
    }
    value = value * Math.pow(10, digits);
    value = Math.round(value);
    value = value / Math.pow(10, digits);
    return value;
}

var reducer = function(dict, count) {
  if (!dict[count]) {
    dict[count] = 1;
  } else {
    dict[count] = dict[count] + 1;
  }
  return dict;
}

let productsTable = document.querySelector('.products-table')
let tbody = productsTable.querySelector('.tbody')

$(document).ready(function(){
	
	let arr = JSON.parse(localStorage.getItem("purchases"))
	log(arr)
	log(productsTable.childNodes[1])

	for (let item of arr) {
		log(item)
		productsTable.childNodes[1].innerHTML += `<tr>
          <td class="product"><button id="remove-button">X</button><img src="${item.image}" width="50%" height="70%"></td>
          <td class="product-name">${item.name}</td>
          <td>$${item.price}</td>
          <td><button type="button" class="minus">-</button><span class="quantity">${item.quantity}</span><button type="button" class="plus">+</button></td>
          <td><span class="quantity">$${(item.price * item.quantity).toFixed(2)}</span></td>
        </tr>`
        totalPrice += (item.price * item.quantity)

		// $('.product-container').append(product)
	}
	// totalPrice = roundToXDigits(totalPrice, 2)
	$('#total-price').text(`$${totalPrice}.00`)
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

	let removes = document.querySelectorAll('#remove-button')
	for (let b of removes) {
		b.addEventListener('click', (e) => {
			log(e.target.parentElement.parentElement.childNodes[9].childNodes[0].innerHTML.substring(1))
			let amount = parseInt(e.target.parentElement.parentElement.childNodes[9].childNodes[0].innerHTML.substring(1))
			totalPrice -= amount;
			$('#total-price').text(`$${totalPrice}.00`)
			e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
		})
	}

	


});

function updatePrice(e) {
	let k = parseInt(e.target.parentElement.childNodes[1].innerHTML) * parseInt(e.target.parentElement.parentElement.childNodes[5].innerHTML.substring(1))
	// k = k.toFixed(2)
	e.target.parentElement.parentElement.childNodes[9].innerHTML = `$${k}.00`
	if (e.target.innerHTML === "+") {
		totalPrice += parseInt(e.target.parentElement.parentElement.childNodes[5].innerHTML.substring(1))
	} else if (e.target.innerHTML === "-") {
		totalPrice -= parseInt(e.target.parentElement.parentElement.childNodes[5].innerHTML.substring(1))
	} else {
		alert("This cant happen!")
	}
	// totalPrice = roundToXDigits(totalPrice, 2)
	// totalPrice = totalPrice.toFixed(2)
	$('#total-price').text(`$${totalPrice}.00`)


}


