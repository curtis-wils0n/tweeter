/**
 * @file Performs math and styling for the output element character counter.
 */
$(document).ready(function() {
  const CHAR_MAX = 140;
  const $tweetText = $('#tweet-text');
  $tweetText.on('input', function() {
    const textLength = $(this).val().length;
    const $counter = $(this).siblings('.submit-counter').children()[1];
    $counter.innerHTML = CHAR_MAX - textLength;
    if ($counter.innerHTML < 0) {
      $($counter).attr('id', 'error-counter-text');
    } else if ($counter.innerHTML >= 0 && $($counter).attr('id') === 'error-counter-text') {
      $($counter).removeAttr('id', 'error-counter-text');
      $($counter).attr('id', 'counter');
    }
  });
});