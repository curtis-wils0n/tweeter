/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  const avatar = tweetData.user.avatars;
  const name = tweetData.user.name;
  const handle = tweetData.user.handle;
  const content = tweetData.content.text;
  const date = tweetData.created_at;
  const $tweet = `
  <article class="tweet">
    <header>
      <img src="${avatar}" alt="Avatar for ${name}">
      <p>${name}</p>
      <p class="hashtag">${handle}</p>
    </header>
    <p>${content}</p>
    <footer>
      <p>${date}</p>
      <span></span>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-retweet"></i>
    </footer>
  </article>
  `
  return $tweet;
};

const renderData = function(tweets) {
  for (const tweet of tweets) {
    const $renderedTweet = createTweetElement(tweet);
    $('.tweet-container').append($renderedTweet);
  }
};

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'JSON',
    success: (fetchedTweets) => {
      renderData(fetchedTweets);
    }
  })
};

$(document).ready(function() {
  //- Hover event-watcher -//
  $('.tweet').mouseenter(function() {
    $(this).addClass('withShadow');
  })
  $('.tweet').mouseleave(function() {
    $(this).removeClass('withShadow');
  })
  $('i').mouseenter(function() {
    $(this).addClass('hovering');
  })
  $('i').mouseleave(function() {
    $(this).removeClass('hovering');
  })
  //- Form submit event-watcher -//
  const $form = $('#submit-tweet');
  $form.submit((event) => {
    event.preventDefault();
    //get the data
    const dataToServer = $form.serialize();
    console.log(dataToServer);
    //Send the info to the server via a POST request
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: dataToServer,
    })
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      console.log('error', error);
    })
  });
  loadTweets();
});
