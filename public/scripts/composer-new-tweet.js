/**
 * @file Performs on-click behaviour of button to hide or show new-tweet
 *     section.
 */
$(document).ready(function() {
  $('.nav-angle').click(function() {
    if ($('.new-tweet').first().is(':hidden')) {
      $('.new-tweet').slideDown('slow');
    } else {
      $('.new-tweet').slideUp('slow');
    }
  });
});