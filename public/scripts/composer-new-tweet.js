$(document).ready(function() {
  $('.nav-angle').click(function() {
    if ($('.new-tweet').first().is(':hidden')) {
      $('.new-tweet').slideDown('slow');
    } else {
      $('.new-tweet').slideUp('slow');
    }
  });
});