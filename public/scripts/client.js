/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweetData) {
  const avatar = tweetData.user.avatars;
  const name = tweetData.user.name;
  const handle = tweetData.user.handle;
  const content = tweetData.content.text;
  const date = timeago.format(tweetData.created_at);
  const $tweet = `
  <article class="tweet">
    <header>
      <img src="${escape(avatar)}" alt="Avatar for ${escape(name)}">
      <p>${escape(name)}</p>
      <p class="hashtag">${escape(handle)}</p>
    </header>
    <p>${escape(content)}</p>
    <footer>
      <p>${escape(date)}</p>
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
    $('.tweet-container').prepend($renderedTweet);
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

loadTweets();

$(document).ready(function() {
  //- Form submit event-watcher -//
  const $form = $('#submit-tweet');
  $form.submit((event) => {
    event.preventDefault();
    //get the data
    const dataToServer = $form.serialize();
    if (dataToServer === 'text=') {
      $('.error-message-length').slideUp('slow');
      if ($('.error-message-text').first().is(':hidden')) {
        $('.error-message-text').slideDown('slow');
      }
    } else if (dataToServer.length > 145) {
      $('.error-message-text').slideUp('slow');
      if ($('.error-message-length').first().is(':hidden')) {
        $('.error-message-length').slideDown('slow');
      }
    } else {
      //Send the info to the server via a POST request
      $('.error-message-length').slideUp('slow');
      $('.error-message-text').slideUp('slow');
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: dataToServer,
      })
      .then(() => {
        $('#tweet-text').val('');
        $('#counter').val(140);
        $.get('/tweets', (fetchedTweets) => {
          $('.tweet-container').prepend(createTweetElement(fetchedTweets.pop()));
        })
      })
      .catch((error) => {
        console.log('error', error);
      })
    }
  });
});
