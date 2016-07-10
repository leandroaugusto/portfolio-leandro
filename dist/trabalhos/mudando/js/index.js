$(document).ready(function() {

	// Não mover o documento
	// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	// Variaveis
		var canvas = document.getElementById('myCanvas');
		var ctx = canvas.getContext("2d");
		var ctd = $('#bgCanvas')[0].getContext("2d");
		var rottate = 1.50;
		var contFoods = 0;
		var contPeople = 0;
		var contFoot = 0;
		var corrida = 2.2;
		var intervalo;

		var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");

	// Canvas do bg
		ctd.beginPath();
		ctd.arc(280, 272, 234, 1.50*Math.PI, 3.6*Math.PI, false);
		ctd.shadowColor = '#cedae9';
		ctd.shadowBlur = 5;
		ctd.shadowOffsetX = 0;
		ctd.shadowOffsetY = 4;
		ctd.strokeStyle = '#dbe4ef';
		ctd.lineWidth = 75;
		ctd.stroke();

	// Ação do teclado
		function teclado() {
			$(document).on('keydown', function(e) {
				if(e.keyCode == 37 || e.keyCode == 39 ){
					set270Canvas();
					$('#menino').addClass('garoto');
					
					corrida -= 0.1;
					var arrCorrida = corrida.toFixed(1);

					$('.garoto').css({
						'-webkit-animation-duration':''+arrCorrida+'s',
						'-moz-animation-duration':''+arrCorrida+'s',
						'-ms-animation-duration':''+arrCorrida+'s',
						'-o-animation-duration':''+arrCorrida+'s'
					});

					if ( arrCorrida < 0.6 ) {
						$(document).off('keydown');
						corrida = 2.2;
						arrCorrida = 2.2;
						$('#menino').removeClass('garoto');
						$('.garoto').css({
							'-webkit-animation-duration':'2.2s',
							'-moz-animation-duration':'2.2s',
							'-ms-animation-duration':'2.2s',
							'-o-animation-duration':'2.2s'
						});
					};
				}
			});
		}

	// Ação dos pés no ipad
		function pes() {
			if(isiPad > -1) {
				$('.feets').fadeIn(500);
				$('.feets div').on('touchstart', function() {
					$('#menino').addClass('garoto');
					$(this).addClass('move');
					set270Canvas();

					corrida -= 0.1;
					var arrCorrida = corrida.toFixed(1);

					$('.garoto').css({
						'-webkit-animation-duration':''+arrCorrida+'s',
						'-moz-animation-duration':''+arrCorrida+'s',
						'-ms-animation-duration':''+arrCorrida+'s',
						'-o-animation-duration':''+arrCorrida+'s'
					});

					if ( arrCorrida < 0.6 ) {
						corrida = 2.2;
						arrCorrida = 2.2;
						
						$('.feets').fadeOut(500);
						$('.feets div').off('touchstart');
						$('#menino').removeClass('garoto');
						
						$('.garoto').css({
							'-webkit-animation-duration':'2.2s',
							'-moz-animation-duration':'2.2s',
							'-ms-animation-duration':'2.2s',
							'-o-animation-duration':'2.2s'
						});
					};
				});
				$('.feets div').on('touchend', function() {
					$(this).removeClass('move');
				});
			}
		}

	// Função que inicia o canvas
		function startCanvas() {
			intervalo = setInterval(function() {
				rottate += 0.03;
				var arrRotate = rottate.toFixed(2);
				
				if ( arrRotate > 1.98 ) {
					rottate = 2.01;
					arrRotate = 2.01;
					$('.bullet-right').addClass('light');
					clearInterval(intervalo);
				};

				rotCanvas(arrRotate);
			},100);
		}

	// Função que rotaciona o canvas em 180º
		function set180Canvas() {
			rottate += 0.06;
			var arrRotate = rottate.toFixed(2);

			if ( arrRotate > 2.46 ) {
				rottate = 2.49;
				arrRotate = 2.49;
				$('.bullet-bottom').addClass('light');
			};

			rotCanvas(arrRotate);
		}

	// Função que rotaciona o canvas em 270º
		function set270Canvas() {
			rottate += 0.03;
			var arrRotate = rottate.toFixed(2);

			if ( arrRotate > 2.97 ) {
				rottate = 3.00;
				arrRotate = 3.00;
				$('.bullet-left').addClass('light');

				$('.steps').fadeOut(500);
				$('.steps[data-step=8]').fadeIn(500);
			};

			rotCanvas(arrRotate);
		}

	// Função que rotaciona o canvas em 360º
		function set360Canvas() {
			rottate += 0.13;
			var arrRotate = rottate.toFixed(2);

			rotCanvas(arrRotate);
		}		
	
	// Função que contém o canvas principal
		function rotCanvas(c) {
			ctx.beginPath();
			ctx.shadowColor = "#345b9c";
			ctx.shadowBlur = 1;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 3;
			ctx.arc(280, 272, 234, 1.50*Math.PI, c*Math.PI, false);
			ctx.strokeStyle = '#608cc3';
			ctx.lineWidth = 75;
			ctx.stroke();
			ctx.closePath();

			console.log('andou '+c);
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
				set180Canvas();

			    $(ui.draggable).fadeOut(500);
			    $(ui.draggable).draggable('option','revert',true);

			    if ( contFoods == 8 ) {
			    	contFoods = 0;

			    	setTimeout(function() {
			    		$('.steps').hide();
						$('.steps[data-step=6]').fadeIn(500);
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

				set360Canvas();

			    $(ui.draggable).fadeOut(600);
			    $(ui.draggable).draggable('option','revert',true);

			    $('#droppable-people p[rel='+relaciona+']').removeClass('cinza').addClass('vermelho');

			    if ( contPeople == 4 ) {
			    	contPeople = 0;

			    	$('ul li').addClass('luzFim');

				    setTimeout(function() {
				    	rottate = 1.50;
						arrRotate = 1.50;
				    	$('.steps').fadeOut(200);
				    	$('#droppable-people p').removeClass('vermelho').addClass('cinza');
				    },3500);

				    setTimeout(function() {
				    	$('ul li').removeClass('light luzFim');
				    	$('ul li').hide();
				    	$('.steps[data-step=13]').fadeIn(500);
				    },5000);
			    };
			}
		}

	// Inicio
		function iniciar() {
			clearInterval(intervalo);

			setTimeout(function() {
				$('.steps').hide();
				$('.steps[data-step=0]').fadeIn(800);
			},1200);


			$('.bt-etapas').click(function() {
				var currentStep = $(this).attr('data-bt');
				$('.steps').fadeOut(500);
				$('.steps[data-step='+currentStep+']').fadeIn(500);

				// Acende luz 1
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
					if(isiPad > -1) {
						$('.key-exp, .pc').hide();
						$('.tablet, .feet-exp').fadeIn(500);
					}
				};

				if ( currentStep == 9 ) {
					$('p.fonte-2').fadeIn(500);
				} else {
					$('p.fonte-2').hide();
				};

				if ( currentStep == 10 ) {
					$('p.fonte-3').fadeIn(500);
				} else {
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
			$('.steps').fadeOut(500);
			
			if ( respQuiz == 1 ) {
				$('.steps[data-step=3]').fadeIn(500);
			} else if( respQuiz == 0 ){
				$('.steps[data-step=2]').fadeIn(500);
			};

			$('.bt-etapas-quiz').removeClass('escolha');
		},800);
	});

	// Anima o canvas a 90º
	$('.resposta').click(function() {
		$('.steps').fadeOut(500);
		startCanvas();
		setTimeout(function() {
			$('.steps[data-step=4]').fadeIn(500);
		},2000);
	});

	// Começa a corrida
	$('.correr').click(function() {
		$('.steps').fadeOut(500);
		teclado();
		pes();
	});

	// Restart
	$('.restart').click(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$('.steps').fadeOut(500);
		clearInterval(intervalo);
		$('.steps[data-step=0]').fadeIn(500);
		$('ul li').fadeIn(500);
	});

});
