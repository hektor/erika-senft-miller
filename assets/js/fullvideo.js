$(document).ready(function() {
  $('body')
    .prepend('<div class="vidcover"></div>')
  
	$(window).resize( function(){
		var theWidth = $(window).width();
		var theHeight = $(window).height();
		var newWidth = (theHeight*2);
		var newHeight = (theWidth/1.8);

		if ( (theWidth > 1280) && (newHeight > theHeight )) {
			$('.fullvid').css({'width':theWidth, 'height':newHeight});
		}

		if ( (theHeight > 720) && (newWidth > theWidth )) {
			$('.fullvid').css({'height':theHeight, 'width':newWidth});
		}

		$('.vidcover').css({'height':theHeight, 'width':theWidth});
	}).resize();
});