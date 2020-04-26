/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {


  //render list of new tweets
  const renderTweets = function(tweets) {
    const $tweets = $('.tweet-container');
    $tweets.empty();
    for (let tweet of tweets) {
      $tweets.prepend(createTweetElement(tweet));
    }
    return $tweets;
  };

  //recieve user info to produce tweet format
  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass("tweet");
    //header
    const $tweetHeader = $('<div>').addClass("tweet-header");
    const $tweetProfile = $('<div>').addClass("tweet-profile");
    const $tweetPicture = $('<img>').attr('src', tweet.user.avatars);
    const $tweetName = $('<div>').addClass("tweet-name").text(tweet.user.name);
    const $tweetHandle = $("<div>").addClass("tweet-handle").text(tweet.user.handle);
    //content
    const $tweetContent = $('<p>').addClass("tweet-content").text(tweet.content.text);
    const $line = $('<hr />');
    //footer
    const $footer = $('<footer>');
    const $datePosted = $("<div>").addClass("date-posted").text(moment(tweet['created_at']).fromNow());
    //create links
    const $links = $('<div>').addClass("little-links");
    const $flaglink = $('<i>').addClass("fas fa-flag");
    const $heartlink = $('<i>').addClass("fas fa-heart");
    const $retweetlink = $('<i>').addClass("fas fa-retweet");
    //append header
    $tweetProfile.append($tweetPicture).append($tweetName);
    $tweetHeader.append($tweetProfile).append($tweetHandle);
    //append links
    $links.append($flaglink).append($heartlink).append($retweetlink);
    //append footer
    $footer.append($datePosted).append($links);
    //append file
    $tweet.append($tweetHeader).append($tweetContent).append($line).append($footer);

    return $tweet;
  };


  //post to server using ajax to post tweet text to server
  $('form').submit(function(event) {

    event.preventDefault();
    const self = (this);
    const characterReset = $(".counter").html(140)
    const characters = Number($(".counter").html());
    const formData = $(this).serialize();
    $(".warning").slideUp("slow")
    //implement validation before sending text to server display warning if no text
    if (formData === "text=" || formData === "text=null") {
      $(".warning").slideDown("slow").text("No text was entered!");
      

      //check character length display warning if characters over 140
    } else if (characters < 0) {
      $(".warning").slideToggle("slow").text("Too many characters!");
      
    } else {
      $.post('/tweets', formData)
        .then(() => {
          $(self)[0].reset();
          loadTweets();
        })
        .catch(err => console.log(err));
    }
  });
 

  //ajax get request to server to fetch tweet data
  const loadTweets = function() {
	
    $.getJSON('/tweets')
      .then((tweets) => {
        //display the tweets from the data
        renderTweets(tweets);
      });
  };


  loadTweets();
	
});


