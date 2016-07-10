$(document).ready(function() {
	contAudio = 0;

	if ( $('#parede').css('background-image') == 'none' ) {
		$('#parede').addClass('imag');
	};

	// Interruptor
	$('.on').on('click', function() {
		$('.lampada').addClass('acesa');
		$('.on').hide();
		$('.off, .brilho').show();
		$('div').css({'-webkit-filter':'grayscale(0)',
						'filter':'grayscale(0)'});
		$('.interruptor div').addClass('aceso');
		$('.lustre').addClass('aceso');
	});
	$('.off').on('click', function() {
		$('.lampada').removeClass('acesa');
		$('.off, .brilho').hide();
		$('.on').show();
		$('div').css({'-webkit-filter':'grayscale(0.2)',
						'filter':'grayscale(0.2)'});
		$('.interruptor div').removeClass('aceso');
		$('.lustre').removeClass('aceso');
	});

	$('.tecla').on('mouseenter click', function() {
		var setKey = $(this).attr('data-audio');

		$(this).css('margin-top','4px');
		$('audio[data-audio='+setKey+']').get(0).play();
	});
	$('.tecla').on('mouseleave', function() {
		$(this).css('margin-top','0px');
	});

});