var skillBars = $('.bar-skills').find('div'),
	windwidth = $(window).width(),
	windheight = $(window).height(),
	$about = $('#about'),
	$jobs = $('#jobs'),
	$contact = $('#contact'),
	$lightBox = $('#lightbox'),
	jobsTop,
	contactTop,
	currentJob;

window.onload = function(e) {
	setTimeout(function(){
		$('#load').fadeOut(500);
		setTimeout(function() {
			$('#wrapper').fadeIn(800);
			skillBars.addClass('animate');
		},400)
	},800);
};

$(document).ready(function() {
	// MENU ÂNCORA
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
					scrollTop: target.offset().top
					}, 2000);
					return false;
				}
			}
		});
	});
	
	// SCROLL
	$(window).scroll(function() {
		var windscroll = $(document).scrollTop();

		if ( windwidth < 768 ) {
			jobsTop = $jobs.offset().top-5;
			contactTop = $contact.offset().top-80;
		} else if ( windwidth >= 768 ) {
			jobsTop = $jobs.offset().top/2;
			contactTop = $contact.offset().top-560;
		};

		// RESETA CADA SEÇÃO
		function hideSection() {
			$('article').css('opacity','.2');
			skillBars.removeClass('animate');
			$('.wrapper-jobs-detail, form, #more-contacts, #about-text, #about-side').removeClass('animate');
		}

		if( windscroll < jobsTop ) {
			hideSection();
			$about.find('article').css('opacity','1');
			skillBars.addClass('animate');
			$('#about-text, #about-side').addClass('animate');

		} else if( windscroll > jobsTop && windscroll < contactTop ) {
			hideSection();
			$jobs.find('article').css('opacity','1');
			$('.wrapper-jobs-detail').addClass('animate');

		} else if( windscroll > contactTop ) {
			hideSection();
			$contact.find('article').css('opacity','1');
			$('form, #more-contacts').addClass('animate');
		};
	});

	// ABRE DETALHES DO TRABALHO

	$('.job-link').on('click', function(e) {
		e.preventDefault();
		currentJob = $(this).attr('data-job');
		console.log(currentJob);

		$('#all-jobs').hide();
		$('#current-job, .job-detail[data-job='+currentJob+']').fadeIn(500);
	});

	// NAVEGA ENTRE OS TRABALHOS
	$('#next').on('click', function() {
		if ( currentJob != 8 ) {
			currentJob = parseInt(currentJob) + 1;
			$('.job-detail').hide();
			$('.job-detail[data-job='+currentJob+']').fadeIn(500);
			console.log(currentJob);

			if ( currentJob > 0 ) {
				$('#prev').css('opacity','1');
			};
		} else {
			currentJob -= 0;
			$(this).css('opacity','.4');
		};
	});
	$('#prev').on('click', function() {
		if ( currentJob != 0 ) {
			currentJob -= 1;
			$('.job-detail').hide();
			$('.job-detail[data-job='+currentJob+']').fadeIn(500);
			console.log(currentJob);

			if ( currentJob < 8 ) {
				$('#next').css('opacity','1');
			};
		} else {
			currentJob -= 0;
			$(this).css('opacity','.4');
		};
	});

	// FECHA DETALHES DO TRABALHO
	$('#close').on('click', function() {
		$('#all-jobs').fadeIn(500);
		$('#current-job, .job-detail').hide();
	});

	// MENU MOBILE
	$('#menu-mobile').on('click', function() {
		$(this).toggleClass('active');
		$('#menu').find('ul').toggle();
	});

	// ENVIO CONTATO
	// function showSuccess(){
	// 	$lightbox.fadeIn(500);
	// 	$lightbox.on('click', function() {
	// 		$(this).fadeOut(500);
	// 	});
	// }
	// $('#send').on('click', function() {
	// 	window.location = window.location;
	// 	$('input:not([type=submit]').val('');
	// 	showSuccess();
	// });
});