$(document).ready(function() {

	// Variaveis
		var contFoods = 0;
		var contPeople = 0;
		var corrida = 0;

	// Ação do teclado
		function teclado() {
			$(document).on('keydown', function(e) {
				if(e.keyCode == 37 || e.keyCode == 39 ){
					corrida -= 182;
					$('#menino').addClass('garoto');
					$('.garoto').css('background-position',''+corrida+'px 0px');

					if ( corrida < -1820 ) {
						corrida = 0;
						$(document).off('keydown');
						$('#menino').removeClass('garoto');
						$('#menino').css('background-position','22px -282px');
						$('.bullet-left').addClass('light');
						$('.steps').hide();
						$('.steps[data-step=8]').fadeIn(200);
						$('#canvasIE img[rel=2]').fadeIn(200);
					};
				}
			});
		}

	// Função que inicia o canvas
		function startCanvas() {
			$('.bullet-right').addClass('light');
			$('#canvasIE img[rel=0]').fadeIn(200);
		}

	// Função para arrastar os alimentos
		function alimentos() {
			$('.draggable-food').show();

			$(".draggable-food").draggable({
				containment: "#wrapper-campanha",
				stack: ".draggable-food"
		    });
			$( "#droppable-food" ).droppable({
				drop: arrastarFood
			});

			function arrastarFood(event, ui) {
				contFoods += 1;

			    $(ui.draggable).fadeOut(600);
			    $(ui.draggable).draggable('option','revert',true);

			    if ( contFoods == 8 ) {
			    	contFoods = 0;

			    	setTimeout(function() {
			    		$('.steps').hide();
			    		$('.bullet-bottom').addClass('light');
						$('#canvasIE img[rel=1]').fadeIn(200);
						$('.steps[data-step=6]').fadeIn(200);
						$('p.fonte-4').fadeIn(500);
					},600);
			    };
			}
		}

	// FUnção dos tipos de diabetes
		function pessoas() {
			$('.draggable-people').show();

			$(".draggable-people").draggable({
				containment: "#wrapper-campanha",
				stack: ".draggable-people"
		    });
			$( "#droppable-people" ).droppable({
				drop: arrastarPeople
			});

			function arrastarPeople(event, ui) {
				var relaciona = $(ui.draggable).attr('rel');
				contPeople += 1;

			    $(ui.draggable).fadeOut(600);
			    $(ui.draggable).draggable('option','revert',true);

			    $('#droppable-people p[rel='+relaciona+']').removeClass('cinza').addClass('vermelho');

			    if ( contPeople == 4 ) {
			    	contPeople = 0;
			    	$('#canvasIE img[rel=3]').fadeIn(200);

				    setTimeout(function() {
				    	$('.steps').hide();
				    	$('#droppable-people p').removeClass('vermelho').addClass('cinza');
				    	$('ul li').removeClass('light');
				    	$('ul li').hide();
				    	$('.steps[data-step=13]').fadeIn(500);
				    },1500);
			    };
			}
		}

	// Inicio
		function iniciar() {
			setTimeout(function() {
				$('.steps').hide();
				$('.steps[data-step=0]').fadeIn(800);
			},1200);


			$('.bt-etapas').click(function() {
				var currentStep = $(this).attr('data-bt');
				$('.steps').hide();
				$('.steps[data-step='+currentStep+']').fadeIn(200);

				if ( currentStep == 1 ) {
					$('.bullet-top').addClass('light');
				};

				// Inicia a função para arrastar os alimentos
				if ( currentStep == 5 ) {
					alimentos();
				};

				if ( currentStep == 1 || currentStep == 2 || currentStep == 3 ) {
					$('p.fonte-1').fadeIn(500);
				} else {
					$('p.fonte-1').fadeOut(500);
				};

				if ( currentStep == 7 ) {
					$('p.fonte-4').fadeOut(500);
				};

				if ( currentStep == 9 ) {
					$('p.fonte-2').fadeIn(500);
				} else {
					$('p.fonte-2').hide();
				};

				if ( currentStep == 10 ) {
					$('.cheio').animate({
						width:'161px'
					},2000)
					$('p.fonte-3').fadeIn(500);
				} else {
					$('.cheio').css('width','0px');
					$('p.fonte-3').fadeOut(500);
				};

				// Inicia a relação dos tipos de diabetes
				if ( currentStep == 12 ) {
					pessoas();
				};
			});
		}

	iniciar();

	// Quiz respostas
	$('.bt-etapas-quiz').click(function() {
		var respQuiz = $(this).attr('data-quiz');
		$(this).addClass('escolha');
		
		setTimeout(function() {
			$('.steps').hide();
			
			if ( respQuiz == 1 ) {
				$('.steps[data-step=3]').fadeIn(200);
			} else if( respQuiz == 0 ){
				$('.steps[data-step=2]').fadeIn(200);
			};

			$('.bt-etapas-quiz').removeClass('escolha');
		},800);
	});

	// Anima o canvas a 90º
	$('.resposta').click(function() {
		$('.steps').hide();
		startCanvas();
		setTimeout(function() {
			$('.steps[data-step=4]').fadeIn(200);
		},1000);
	});

	// Começa a corrida
	$('.correr').click(function() {
		$('.steps').hide();
		teclado();
	});

	// Restart
	$('.restart').click(function() {
		$('.steps').hide();
		$('#canvasIE img').fadeOut(200);
		$('.steps[data-step=0]').fadeIn(200);
		$('ul li').fadeIn(200);
	});

});
