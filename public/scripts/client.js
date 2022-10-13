/**
 * Prevents cross-site scripting by returning non-executable html in a "text 
 *     node".
 * 
 * @param {string} str Value to be parsed
 * @returns {string} Inner HTML of div with str value
 */
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
/**
 * Receives a JSON object to return its values as an html block.
 * 
 * @param {json} tweetData 
 * @returns {string} Parsed string formatted as an html block
 */
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
  `;
  return $tweet;
};
/**
 * Works through a list of json objects and passes the value of each to 
 *     createTweetElement().
 * 
 * @param {Array.<json>} tweets
 */
const renderData = function(tweets) {
  for (const tweet of tweets) {
    const $renderedTweet = createTweetElement(tweet);
    $('.tweet-container').prepend($renderedTweet);
  }
};
/**
 * Fetches tweets from /tweets route and passes contents to renderData().
 */
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'JSON',
    success: (fetchedTweets) => {
      renderData(fetchedTweets);
    }
  });
};
// Load initial tweets
loadTweets();
// Executes once document has loaded
$(document).ready(function() {
  //- Form submit event-watcher -//
  const $form = $('#submit-tweet');
  $form.submit((event) => {
    event.preventDefault();
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
      // Hide error messages if shown
      $('.error-message-length').slideUp('slow');
      $('.error-message-text').slideUp('slow');
      // Post to and retrieve contents of /tweets and display the newest
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: dataToServer,
      })
        .then(() => {
          // Reset textarea and counter
          $('#tweet-text').val('');
          $('#counter').val(140);
          $.get('/tweets', (fetchedTweets) => {
            $('.tweet-container').prepend(createTweetElement(fetchedTweets.pop()));
          });
        })
    }
  });
});