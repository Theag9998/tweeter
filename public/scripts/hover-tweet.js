//implement the hover effect on the tweet
$(document).ready(function() {
	$(".tweet").hover(function(event) {
		//console.log("woo"
		$(this).css("opacity", 1)
		$(".tweet-handle").css("opacity", .5)

	}, function () {
		$(this).css("opacity", .5)
		$(".tweet-handle").css("opacity", 0)
	})
})