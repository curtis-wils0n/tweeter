/**
 * @file Performs navigation bar hiding and button displaying if y-value of
 *     window passes a certain point.
 */
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('#nav-bar').slideUp();
      $('#toTop:hidden').slideDown();
    } else {
      $('#nav-bar:hidden').slideDown();
      $('#toTop').slideUp();
    }
  });
  $('#toTop').click(function() {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  });
});