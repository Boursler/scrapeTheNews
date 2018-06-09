$(document).ready(function () {
	$.ajax({
			method: "GET",
			url: "/articles/"
		})
		// With that done, add the note information to the page
		.then(function (data) {
			console.log(data);
		});

});
