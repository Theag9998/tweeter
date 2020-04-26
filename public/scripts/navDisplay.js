//implementing the on click nav display
$(document).ready(function() {

	$(".create-new-tweet").click(function(event) {
		$(".new-tweet").slideToggle("slow");
		$("#tweet-text").focus()
	})
})