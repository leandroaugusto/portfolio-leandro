$(document).ready(function() {
	var countQuestions = -1;
	var countDown = 0;
	var intervalo;
	var verifyQue = 0;
	var sorteio = 0;
	var totalPerguntas = new Array();
	var listaNegra = new Array();
	var perguntasRodada;

	$('#bg-quiz').scroll(function() {
		var scrol = $(this).scrollTop();
		$('#scroller').css('top','-'+scrol+'px');
	});

	// Ajax para carregar o XML
	$.ajax({
		type: "GET",
		url: "xml/questions-big.xml",
		dataType: "xml",
		success: xmlParser
	});

	// Função que organiza as informações vindas do XML
	function xmlParser(xml) {
		var quantQue = $(xml).find('questions').length;

		// Função que preenche o array "totalPerguntas"
		function preencheLista() {
			for (i=0; i<quantQue; i++) {
				totalPerguntas.push(i);
			}
		}
		preencheLista();

		// Sorteia o número de perguntas da rodada
		function sorteiosRodada(arr, count) {
			var shuffled = arr.slice(0), j=arr.length, min=j-count, temp, index;
			while (j-- > min) {
				index = Math.floor((j + 1) * Math.random());
				temp = shuffled[index];
				shuffled[index] = shuffled[j];
				shuffled[j] = temp;
			}
			return shuffled.slice(min);
		}

		function sorteioNovo() {
			perguntasRodada = sorteiosRodada(totalPerguntas, 4);
			verifyQue = perguntasRodada.length;
		}
		sorteioNovo();

		console.log(perguntasRodada);

		// Botao start para inciar o quiz
		$('#start').on('click', function() {
			countQuestions += 1;
			startQuiz();
		});

		// Escolha da alternativa
		$('#answers li').on('click', function() {
			var result = $(this).attr('check');
			$(this).css('background-position','0 -117px');
			clearInterval(intervalo);

			if ( result == 1 ) {
				setTimeout(function(){
					$('.step').hide();
					$('#hit').stop().fadeIn(500);
					$('#answers li').css('background-position','0 0');
					nextQuestion();
				}, 1000);
			} else {
				setTimeout(function(){
					$('.step').hide();
					$('#error').stop().fadeIn(500);
					$('#answers li').css('background-position','0 0');
					tryAgain();
				}, 1000);
			};
		});

		// Função que inicia o quiz
		function startQuiz() {
			$('.step').hide();
			$('#bg-quiz').fadeIn(500);

			// Organizando o sorteio
			sorteio = perguntasRodada[Math.floor(Math.random() * perguntasRodada.length)];
			perguntasRodada.splice($.inArray(sorteio, perguntasRodada), 1);
			listaNegra.push(sorteio);
			console.log(sorteio, listaNegra, perguntasRodada);

			if ( listaNegra.length <= verifyQue ) {
				// Puxa as informações do XML
				$(xml).find('questions:eq('+sorteio+')').each(function () {
					$('#bg-quiz').scrollTop(0);

					var pergunta = $(this).find("question").text();

					var expn = $(this).find("image").attr('src');

					var resp1 = $(this).find("answer").eq(0);
					var respCheck1 = resp1.attr('check');
					var respText1 = resp1.text();

					var resp2 = $(this).find("answer").eq(1);
					var respCheck2 = resp2.attr('check');
					var respText2 = resp2.text();

					var resp3 = $(this).find("answer").eq(2);
					var respCheck3 = resp3.attr('check');
					var respText3 = resp3.text();

					var currentQue = countQuestions + 1;
					$('#number').html('pergunta '+currentQue+' <span style="font-size:24px">de</span> '+verifyQue+'');

					$('#question').text(pergunta);

					if ( expn != '' ) {
						$('#explanation').show().attr('src', expn);
					} else {
						$('#explanation').hide();
					};

					$('#answers li:eq(0)').attr('check', respCheck1);
					$('#answers li:eq(0) p').text(respText1);

					$('#answers li:eq(1)').attr('check', respCheck2);
					$('#answers li:eq(1) p').text(respText2);

					if ( respText3 != '' ) {
						$('#answers li:eq(2)').show();
						$('#answers li:eq(2)').attr('check', respCheck3);
						$('#answers li:eq(2) p').text(respText3);
					} else {
						$('#answers li:eq(2)').hide();
					};
				});
			}
		}

		// Função para tentar novamente
		function tryAgain() {
			intervalo = setInterval(function() {
				countDown -= 80;
				$('#countdown').css('background-position',''+countDown+'px 0');
				if ( countDown <= -400 ) {
					countDown = 0;
					clearInterval(intervalo);
					$('#countdown').css('background-position','0px 0');
					$('.step').hide();
					$('#bg-quiz').fadeIn(500);
				};
			}, 1000);
		}

		// Função para avançar para a próxima pergunta
		function nextQuestion() {
			countQuestions += 1;
			setTimeout(function() {
				if ( countQuestions == verifyQue ) {
					resetQuiz();
				} else {
					startQuiz();
				};
			}, 2000);
		}

		// Função que retorna ao início
		function resetQuiz() {
			$('.step').hide();
			$('#cover').fadeIn(500);
			countQuestions = -1;
			listaNegra = [];
			preencheLista();
			sorteioNovo();
		}
	}

});