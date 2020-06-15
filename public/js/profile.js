
log($(".gallery"))

const spans = document.getElementsByTagName("span")


$(document).ready(function() {
	$('#profile-name').text(myStorage.getItem("firstname") + " " + myStorage.getItem("lastname") + "' Profile")
	$('#email').text(myStorage.getItem("email"))
	$('#membership').text(myStorage.getItem("type"))
	$('#yourbio').text(myStorage.getItem("bio") + myStorage.getItem("password")) // remember to remove this last part

	$('#editButton').click(function() {
		for (let span of spans) {
			span.contentEditable = true;
		}
	})

})