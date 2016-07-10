$(document).ready(function() {

	setTimeout(function(){
		$('.tit1').fadeIn(2000);
	},500);

	setTimeout(function(){
		$('.passe, .leg1').fadeIn(800);
	},1200);

	// $('.tit1').show( "puff", {percent:30}, 1500 );
	// $('.leg1').delay(750).fadeIn(500);

	$(function(){
			
		swiperParent = new Swiper('.swiper-parent', {
			onSlideChangeStart: function() {
				$('.bg .swiper-slide').removeClass('active');
	    		$('.bg .swiper-slide').eq(swiperParent.activeIndex).addClass('active');

	    		if ( $('.bg .swiper-slide[rel=0]').hasClass('active') ) {
	    			$('.titulo').hide();
	    			$('.tit1').fadeIn(800);
	    		};

	    		if ( $('.bg .swiper-slide[rel=1]').hasClass('active') ) {
	    			$('.titulo').hide();
	    			$('.tit2').fadeIn(800);
	    		};

	    		if ( $('.bg .swiper-slide[rel=2]').hasClass('active') ) {
	    			$('.titulo').hide();
	    			$('.tit3').fadeIn(800);
	    		};
	    		
	    		if( $('.bg .swiper-slide[rel=3]').hasClass('active') ){
				    $('.titulo').hide();
				    $('.passe, #content').fadeIn(500);
	    			$('.tit4').fadeIn(800);
				
				} else if( $('.bg .swiper-slide[rel=4]').hasClass('active') ) {
					$('.passe, #content, .titulo').fadeOut(100);
				};
	        }
		});

		// var contMais = >2;
		// var contMenos = <3;

	    var swiperNested1 = new Swiper('.swiper-nested-1', {
	    	onSlideChangeStart: function() {
				$('.ipad .swiper-slide').removeClass('active');
	    		$('.ipad .swiper-slide').eq(swiperNested1.activeIndex).addClass('active');

	    		if ( $('.ipad .swiper-slide[rel=3]').hasClass('active') ) {
	    			$('.legenda').hide();
	    			$('.leg2').fadeIn(500);
	    		} else if( $('.ipad .swiper-slide[rel=2]').hasClass('active') ) {
	    			$('.legenda').hide();
	    			$('.leg1').fadeIn(500);
	    		};
	    	}
		})

	})

});