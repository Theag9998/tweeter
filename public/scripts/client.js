/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // const $img = $('<img>').attr('src', ...)

 $(document).ready(function() {
	


//render list of new tweets
const renderTweets = function(tweets) {
	const $tweets = $('.tweet-container')
	$tweets.empty()
	for (let tweet of tweets) {
		$tweets.prepend(createTweetElement(tweet))
	}
	return $tweets
}

//recieve user info to produce tweet format
const createTweetElement = function(tweet) {
	const $tweet = $('<article>').addClass("tweet");
	//header
	const $header = $('<header>');
	const $tweetProfile = $('<div>').addClass("tweet-profile")
	const $tweetPicture = $('<div>').addClass("tweet-picture").text("PICTURE")
	const $tweetName = $('<div>').addClass("tweet-name").text(tweet.user.name);
	const $tweetHandle = $("<div>").addClass("tweet-handle").text(tweet.user.handle)
	//content
	const $tweetContent = $('<p>').addClass("tweet-content").text(tweet.content.text)
	const $line = $('<hr />')
	//footer
	const $footer = $('<footer>');
	const $datePosted = $("<div>").addClass("date-posted").text(tweet.created_at); //moment
	const $links = $('<div>').addClass("little-links").text("LINKS")
	//append header
	$tweetProfile.append($tweetPicture).append($tweetName)
	$header.append($tweetProfile).append($tweetHandle)
	//append footer
	$footer.append($datePosted).append($links)
	//append file
	$tweet.append($header).append($tweetContent).append($line).append($footer)

	return $tweet;
}


//post to server using ajax to post tweet text to server
 $('form').submit(function(event) {

	event.preventDefault();
	const self = (this);
	const characters = Number($(".counter").html())
	const formData = $(this).serialize();
 	//implement validation before sending text to server display warning if no text
	if (formData === "text=" || formData === "text=null") {
		$(".warning").slideUp("slow")
		$(".warning").slideDown("slow").text("No text was entered!")
		

		//check character length display warning if characters over 140
	} else if (characters < 0) {
		$(".warning").slideUp("slow")
		$(".warning").slideDown("slow").text("Too many characters!")
		
	} else {
		$(".warning").slideUp("slow")
		$.post('/tweets', formData)
		.then(() => {
			$(self)[0].reset();
			loadTweets()
		})
		.catch(err => console.log(err))
	}
 })
 

 //ajax get request to server to fetch tweet data
 const loadTweets = function () {
	
	 $.getJSON('/tweets')
	 .then((tweets) => {
		 //display the tweets from the data 
		 renderTweets(tweets)
		 
	 })
	}


	loadTweets()
	
})


