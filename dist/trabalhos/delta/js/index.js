$(document).ready(function() {
	// Variaveis
		var contCases = $('#portfolio .thumbs').length;
		var allCases = contCases*184;
		var marginCases = contCases*30;
		var totalCases = allCases + marginCases;
		var finalCases = totalCases - 856;
		var addCases = 0;
		var thisSection;
		var currSection;

	// Define a largura da ul cases
		$('#portfolio ul').css('width',''+totalCases+'px');

	// Navega para a esquerda na ul cases
		$('.arrow.left').on('click', function() {
			if ( addCases != -finalCases ) {
				addCases -= 214;

				$('#portfolio ul').animate({
					marginLeft: ''+addCases+'px'
				}, 800);

				if ( addCases < 0 ) {
					$('.arrow.right').css('opacity','1');
				}

			} else {
				addCases -= 0;
				$(this).css('opacity','.3');
			}
		});

	// Navega para a direita na ul cases
		$('.arrow.right').on('click', function() {
			if ( addCases != 0 ) {
				addCases += 214;
				
				// $('#portfolio ul').css('margin-left',''+addCases+'px');
				$('#portfolio ul').animate({
					marginLeft: ''+addCases+'px'
				}, 800);

				if ( addCases > -finalCases ) {
					$('.arrow.left').css('opacity','1');
				}

			} else {
				addCases += 0;
				$(this).css('opacity','.3');
			}
		});

	// scroll
		$(function() {
			$('a[href*=#]:not([href=#])').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
					if (target.length) {
						$('html,body').animate({
						scrollTop: target.offset().top-110
						}, 2000);
						return false;
					}
				}
			});
		});

	// Define a posição inicial dos objetos com translateY
	$('.paralax').each(function() {
		var hgt = $(this).outerHeight();
		$(this).css('-webkit-transform', 'translateY('+ -hgt + 'px)');
	});

	// Menu ativo
		$(window).scroll(function() {
			var windscroll = $(document).scrollTop();
			var section1Top =  0;
			var section2Top =  $('#delta').offset().top - (($('#services').offset().top - $('#delta').offset().top) / 8);
			var section3Top =  $('#services').offset().top - (($('#portfolio').offset().top - $('#services').offset().top) / 8);
			var section4Top =  $('#portfolio').offset().top - (($('#clients').offset().top - $('#portfolio').offset().top) / 8);
			var section5Top =  $('#clients').offset().top - (($('#contact').offset().top - $('#clients').offset().top) / 8);
			var section6Top =  $('#contact').offset().top - (($(document).height() - $('#contact').offset().top) / 8);

			if ( windscroll >= section1Top && windscroll < section2Top ){

				$('section .paralax').css('opacity','0');
				$('.menu a').removeClass('active');

			} else if ( windscroll >= section2Top && windscroll < section3Top ){

				$('section').removeClass('active');
				$('section').eq(1).addClass('active');
				mountSite();
				$('.menu a').removeClass('active');
				$('.menu a').eq(0).addClass('active');

			} else if ( windscroll >= section3Top && windscroll < section4Top ){

				$('section').removeClass('active');
				$('section').eq(2).addClass('active');
				mountSite();
				$('.menu a').removeClass('active');
				$('.menu a').eq(1).addClass('active');

			} else if ( windscroll >= section4Top && windscroll < section5Top ){

				$('section').removeClass('active');
				$('section').eq(3).addClass('active');
				mountSite();
				$('.menu a').removeClass('active');
				$('.menu a').eq(2).addClass('active');

			} else if ( windscroll >= section5Top && windscroll < section6Top ){

				$('section').removeClass('active');
				$('section').eq(4).addClass('active');
				mountSite();
				$('.menu a').removeClass('active');
				$('.menu a').eq(3).addClass('active');

			} else if ( windscroll >= section6Top ){

				$('section').removeClass('active');
				$('section').eq(5).addClass('active');
				mountSite();
				$('.menu a').removeClass('active');
				$('.menu a').eq(4).addClass('active');

			}
		}).scroll();

	// Parallax
		function mountSite() {
			var $obj = $('section.active .paralax');
			$obj.css('opacity','1');

			$(window).scroll(function() {
				var yPos = ($(window).scrollTop() / $obj.data('speed'));
				if ( yPos < 0 ) {
					$obj.css('-webkit-transform', 'translateY('+ yPos + 'px)' );
				} else {
					$obj.css('-webkit-transform', 'translateY(0px)' );
				};
			});
		}
});

// $('section').each(function(i) {
// 	if ($(this).position().top <= windscroll - 850) {
// 		$('.menu a').removeClass('active');
// 		$('.menu a').eq(i).addClass('active');
// 	}
// });