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
	arr.forEach(item => {
		if (!d[item.id]) {
			d[item.id] = [1, item.price, item.name, item.image];
		} else {
			d[item.id][0] += 1;
		}
	})
	log(d)

	for (let item of Object.entries(d)) {
		log(item)
		productsTable.innerHTML += `<tr>
          <td class="product"><img src="${item[1][3]}" width="50%" height="70%"></td>
          <td class="product-name">${item[1][2]}</td>
          <td>$${item[1][1]}</td>
          <td><button type="button" class="minus">-</button><span class="quantity">${item[1][0]}</span><button type="button" class="plus">+</button></td>
          <td><span class="quantity">$${item[1][0] * item[1][1]}</span></td>
        </tr>`
        totalPrice += item[1][0] * item[1][1]

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


