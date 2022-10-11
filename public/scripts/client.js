/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const $tweet = $('.tweet');
  const $social = $('i');
  $tweet.on('mouseenter', function() {
    $(this).addClass('withShadow');
  })
  $tweet.on('mouseleave', function() {
    $(this).removeClass('withShadow');
  })
  $social.on('mouseenter', function() {
    $(this).addClass('hovering');
  })
  $social.on('mouseleave', function() {
    $(this).removeClass('hovering');
  })
});
