/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // const $img = $('<img>').attr('src', ...)

 $(document).ready(function() {
const data = [
	{
		"user": {
			"name": "Newton",
			"avatars": "https://i.imgur.com/73hZDYK.png"
			,
			"handle": "@SirIsaac"
		},
		"content": {
			"text": "If I have seen further it is by standing on the shoulders of giants"
		},
		"created_at": 1461116232227
	},
	{
		"user": {
			"name": "Descartes",
			"avatars": "https://i.imgur.com/nlhLi3I.png",
			"handle": "@rd" },
		"content": {
			"text": "Je pense , donc je suis"
		},
		"created_at": 1461113959088
	}
]
//<section class="tweet-container">

const renderTweets = function(tweets) {
	const $tweets = $('.tweet-container')
	for (let tweet of tweets) {
		$tweets.append(createTweetElement(tweet))
	}
	return $tweets
}

const createTweetElement = function(tweet) {
	const $tweet = $('<article>').addClass("tweet");
	//header
	const $header = $('<header>');
	const $tweetProfile = $('<div>').addClass("tweet-profile")
	const $tweetPicture = $('<div>').addClass("tweet-picture").text("PICTURE")
	const $tweetName = $('<div>').addClass("tweet-name").text(tweet.user.name);
	const $tweetHandle = $("<div>").addClass("tweet-handle").text(tweet.user.handle)
	//content
	const $tweetContent = $('<div>').addClass("tweet-content").text(tweet.content.text)
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

renderTweets(data);
 $('form').submit(function(event) {
	event.preventDefault();
	const self = (this);
	const formData = $(this).serialize();
	$.post('/tweets', formData)
		.then(() => {
			$(self)[0].reset();
			renderTweets(data)
		})
		.catch(err => console.log(err))
 })
	
})


