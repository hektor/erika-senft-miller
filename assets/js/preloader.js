$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').delay(500).fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(750).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(750).css({'overflow':'visible'});
})