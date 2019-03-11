/*
	Future Imperfect by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$menu = $('#menu'),
			$sidebar = $('#sidebar'),
			$main = $('#main');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// IE<=9: Reverse order of main and sidebar.
			if (skel.vars.IEVersion <= 9)
				$main.insertAfter($sidebar);

		// 菜单
			$menu
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Search (header).
			var $search = $('#search'),
				$search_input = $search.find('input');

			$body
				.on('click', '[href="#search"]', function(event) {

					event.preventDefault();

					// Not visible?
						if (!$search.hasClass('visible')) {

							// Reset form.
								$search[0].reset();

							// Show.
								$search.addClass('visible');

							// Focus input.
								$search_input.focus();
								

						}

				});



		//搜索框优化
			$search_input
				.on('keydown', function(event) {
                    $(this).attr("placeholder","Search");
					if (event.keyCode == 27)
						$search_input.blur();		

				}).on('keyup',function(event){
					if($(this).val()!=""){$("#search .delete").css("display","block")}
					else{$("#search .delete").css("display","none")}
				});
				$search.on('mouseleave', function() {

					if($(this).find("[name=kword]").val()=="")
					{window.setTimeout(function() {
						$search.removeClass('visible');
					}, 10000);}
					
				});

		// Intro.
			var $intro = $('#intro');

			// Move to main on <=large, back to sidebar on >large.
				skel
					.on('+large', function() {
						$intro.prependTo($main);
					})
					.on('-large', function() {
						$intro.prependTo($sidebar);
					});


		 //点赞功能


		 (function(){

           
			let clicked=false;

			$("footer>.stats>li>.fa-heart").on("click",function(event){

				event.preventDefault();
	  
				let likeNumber=Number($(this).text());
	  
	  
				if(!clicked){$(this).text(++likeNumber);clicked=true;}
	  
				else{$(this).text(--likeNumber);clicked=false;}
				
			   })


		 }())
		 

					

	});

})(jQuery);