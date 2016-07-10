$(document).ready(function() {
	// Scroll horizontal
		$('#wrapper').scroll(function() {
			var scrol = $(this).scrollLeft();
			$('#scroller').css('left','-'+scrol+'px');
		});

	// Clone da imagem default
		$.fn.duplicate = function(count, cloneEvents) {
			var tmp = [];
			for ( var i = 0; i < count; i++ ) {
				$.merge( tmp, this.clone( cloneEvents ).get() );
			}
			return this.pushStack( tmp );
		};
		$('.fixa').duplicate(108).appendTo(".column");

	// Imagens aleatórias
		var divs = $("div.post").get().sort(function() {
			return Math.round(Math.random())-0.8;
		}).slice(0.100)
		$(divs).appendTo(divs[0].parentNode).show();

	// Separa as divs em colunas
		$('.post').each(function(index,element) {
			var e = parseInt(index / 7);
			if($('#scroller .column').eq(e).length == 0) {
				$('#scroller').append('<div class="column"></div>')
			}
			$('#scroller .column').eq(e).append(element);
		});

		// Largura da div scroller
		var contColumns = $('.column').length;
		var widthScroller = contColumns*96;
		$('#scroller').css('width',''+widthScroller+'px');

	var navMedias = 1;

	// Abrir lightbox
		$('.open img').on('click', function() {
			// Variáveis
				var openFolder = $(this).attr('data-folder');
				var openMedia = $(this).attr('data-media');
				var extVideo = $(this).attr('data-video');
				var extDesenho = $(this).attr('data-draw');
				var extTexto = $(this).attr('data-txt');

			// Pega o nome da pessoa no arquivo xml e mostra no lightbox
				xmlDoc=loadXMLDoc('users/'+openFolder+'/name.xml');
				var namePerson = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
				$('.name').text(namePerson);

			// Mostra o lightbox
				$('#lightbox, #lightbox-content').fadeIn(500);
			// Esconde o conteudo ao navegar entre as midias
				$('.bts').click(function() {
					$('.medias').hide();
				});

			// Funções para ativar e desativar os botões de navegação
				function offRight() {
					$('.right').hide();
				}
				function onRight() {
					$('.right').fadeIn(500);
				}
				function offLeft() {
					$('.left').hide();
				}
				function onLeft() {
					$('.left').fadeIn(500);
				}

			// Abre foto ou mensagem de texto
			if ( openMedia != 'video' ) {
				$('.medias').hide();
				$('#lightbox-content img').attr('src', 'users/'+openFolder+'/'+openMedia+'.png').fadeIn(500);

				// Navega entre as midias quando começa em foto
				if ( openMedia == 'picCapture' ) {
					navMedias = 1;
					offLeft();
					onRight();

					// Se existe video, desenho e texto
					if ( extVideo == 'y' && extDesenho == 'y' && extTexto == 'y' ) {
						$('.right').on('click', function() {
							navMedias += 1;
							if ( navMedias == 2 ) {
								$('#video').fadeIn(500);
								onLeft();
							} else if ( navMedias == 3 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
							} else if ( navMedias == 4 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/textMessage.png').fadeIn(500);
								offRight();
							};
						});
						$('.left').on('click', function() {
							navMedias -= 1;
							if ( navMedias == 1 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/picCapture.png').fadeIn(500);
								offLeft();
							} else if ( navMedias == 2 ) {
								$('#video').fadeIn(500);
							} else if ( navMedias == 3 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
								onRight();
							};
						});

					// Se existe video e desenho, mas não existe texto
					} else if ( extVideo == 'y' && extDesenho == 'y' && extTexto == '' ) {
						$('.right').on('click', function() {
							navMedias += 1;
							if ( navMedias == 2 ) {
								$('#video').fadeIn(500);
								onLeft();
							} else if ( navMedias == 3 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
								offRight();
							};
						});
						$('.left').on('click', function() {
							navMedias -= 1;
							if ( navMedias == 1 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/picCapture.png').fadeIn(500);
								offLeft();
							} else if ( navMedias == 2 ) {
								$('#video').fadeIn(500);
								onRight();
							};
						});

					// Se existe video e texto, mas nao existe desenho
					} else if ( extVideo == 'y' && extDesenho == '' && extTexto == 'y' ) {
						$('.right').on('click', function() {
							navMedias += 1;
							if ( navMedias == 2 ) {
								$('#video').fadeIn(500);
								onLeft();
							} else if ( navMedias == 3 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/textMessage.png').fadeIn(500);
								offRight();
							};
						});
						$('.left').on('click', function() {
							navMedias -= 1;
							if ( navMedias == 1 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/picCapture.png').fadeIn(500);
								offLeft();
							} else if ( navMedias == 2 ) {
								$('#video').fadeIn(500);
								onRight();
							};
						});

					// Se existe desenho e texto, mas nao existe video
					} else if ( extVideo == '' && extDesenho == 'y' && extTexto == 'y' ) {
						$('.right').on('click', function() {
							navMedias += 1;
							if ( navMedias == 2 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
								onLeft();
							} else if ( navMedias == 3 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/textMessage.png').fadeIn(500);
								offRight();
							};
						});
						$('.left').on('click', function() {
							navMedias -= 1;
							if ( navMedias == 1 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/picCapture.png').fadeIn(500);
								offLeft();
							} else if ( navMedias == 2 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
								onRight();
							};
						});

					// Se existe só texto e não existe video nem desenho
					} else if ( extVideo == '' && extDesenho == '' && extTexto == 'y' ) {
						$('.right').on('click', function() {
							navMedias += 1;
							if ( navMedias == 2 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/textMessage.png').fadeIn(500);
								offRight();
								onLeft();
							};
						});
						$('.left').on('click', function() {
							navMedias -= 1;
							if ( navMedias == 1 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/picCapture.png').fadeIn(500);
								offLeft();
								onRight();
							};
						});

					// Se existe só desenho
					} else if ( extVideo == '' && extDesenho == 'y' && extTexto == '' ) {
						$('.right').on('click', function() {
							navMedias += 1;
							if ( navMedias == 2 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
								offRight();
								onLeft();
							};
						});
						$('.left').on('click', function() {
							navMedias -= 1;
							if ( navMedias == 1 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/picCapture.png').fadeIn(500);
								offLeft();
								onRight();
							};
						});

					// Se existe só video
					} else if ( extVideo == 'y' && extDesenho == '' && extTexto == '' ) {
						$('.right').on('click', function() {
							navMedias += 1;
							if ( navMedias == 2 ) {
								$('#video').fadeIn(500);
								offRight();
								onLeft();
							};
						});
						$('.left').on('click', function() {
							navMedias -= 1;
							if ( navMedias == 1 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/picCapture.png').fadeIn(500);
								offLeft();
								onRight();
							};
						});

					// Se não existe nem video nem texto nem desenho
					} else if ( extVideo, extDesenho, extTexto == '' ) {
						offLeft();
						offRight();
					};

				// Navega entre as midias quando começa em desenho
				} else if ( openMedia == 'drawingMessage' ) {
					navMedias = 1;
					offLeft();
					onRight();

					// Se existe texto
					if ( extTexto == 'y' ) {
						$('.right').on('click', function() {
							navMedias += 1;
							if ( navMedias == 2 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/textMessage.png').fadeIn(500);
								onLeft();
								offRight();
							};
						});
						$('.left').on('click', function() {
							navMedias -= 1;
							if ( navMedias == 1 ) {
								$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
								offLeft();
								onRight();
							};
						});

					// Se não existe texto
					} else if ( extTexto == '' ) {
						offLeft();
						offRight();
					};

				// Esconde os botoes, pois só existe texto
				} else if ( openMedia == 'textMessage' ) {
					navMedias = 1;
					offLeft();
					offRight();
				};

			// Abre vídeo
			} else {
				navMedias = 1;
				offLeft();
				onRight();
				$('.medias').hide();
				$('#video').attr('src', 'users/'+openFolder+'/video.mp4');
				$('#video').delay(500).fadeIn(200);

				// Se existe desenho e texto
				if ( extDesenho == 'y' && extTexto == 'y' ) {
					$('.right').on('click', function() {
						navMedias += 1;
						if ( navMedias == 2 ) {
							$('#lightbox-content img').attr('src', 'users/'+openFolder+'/textMessage.png').fadeIn(500);
							onLeft();
						} else if ( navMedias == 3 ) {
							$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
							offRight();
						};
					});
					$('.left').on('click', function() {
						navMedias -= 1;
						if ( navMedias == 1 ) {
							$('#video').fadeIn(500);
							offLeft();
						} else if ( navMedias == 2 ) {
							$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
							onRight();
						};
					});

				// Se não existe texto nem desenho, esconde os botões
				} else if ( extDesenho == '' && extTexto == '' ) {
					offLeft();
					offRight();

				// Se existe só texto
				} else if ( extDesenho == '' && extTexto == 'y' ) {
					$('.right').on('click', function() {
						navMedias += 1;
						if ( navMedias == 2 ) {
							$('#lightbox-content img').attr('src', 'users/'+openFolder+'/textMessage.png').fadeIn(500);
							onLeft();
							offRight();
						};
					});
					$('.left').on('click', function() {
						navMedias -= 1;
						if ( navMedias == 1 ) {
							$('#video').fadeIn(500);
							offLeft();
							onRight();
						};
					});

				// Se existe só desenho
				} else if ( extDesenho == 'y' && extTexto == '' ) {
					$('.right').on('click', function() {
						navMedias += 1;
						if ( navMedias == 2 ) {
							$('#lightbox-content img').attr('src', 'users/'+openFolder+'/drawingMessage.png').fadeIn(500);
							onLeft();
							offRight();
						};
					});
					$('.left').on('click', function() {
						navMedias -= 1;
						if ( navMedias == 1 ) {
							$('#video').fadeIn(500);
							offLeft();
							onRight();
						};
					});
				};
			};

			// Muda o tamanho da div quando for mensagem de texto
				if ( openMedia != 'textMessage' ) {
					$('#lightbox-content').css('top','80px');
					$('#buttons').css('top','214px');
				} else {
					$('#lightbox-content').css('top','120px');
					$('#buttons').css('top','184px');
				};

			// Fecha o lightbox
				$('.close, #lightbox').on('click', function() {
					$('#lightbox, #lightbox-content').fadeOut(100);
					$('.medias').hide();
					$('.bts').off();
					$('#video').get(0).pause();
					$('#video').get(0).currentTime = 0;
				});
		});

});