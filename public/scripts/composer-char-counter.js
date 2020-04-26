//implementing the character counter into the DOM
$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet form textarea").keyup(function(event) {
    let characterLength = $(this).val();
    //go up the dom tree to get access to counter
    let characterRemaining = $(this).parent().find(".counter").html(140 - characterLength.length);
    let numOfCharacterRemaining = Number($(characterRemaining).val());
    //if the number of characters remaing is negative turn the text red
    if (numOfCharacterRemaining < 0) {
      $(characterRemaining).css("color", "red");
      //else maintain original color
    } else {
      $(characterRemaining).css("color", "#545149");
    }
  });
	

});