$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').delay(2000).fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(2250).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(2250).css({'overflow':'visible'});
})