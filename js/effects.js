/*
 * This module takes care of parallax images, sliding images and collapsible navigation.
 */

(function () {

	'use strict';

	var $images = $('span[data-src]'), // Get all images on the page
		imagesPosition = [], // Temp array to store position of all images on the page
		bodyBgPosition = parseInt($('body').css('backgroundPosition').split(' ')[1].replace('px')), // Get horizontal position of image which is on the top of the site for counting parallax behavior
		isTouch = false;
		

	// Disable effects on images on touch devices
	if ($('html.touch').length > 0) {
		isTouch = true;
	}

	if (isTouch === false) {
		$images.css({
			visibility: 'hidden', 
			opacity: 0
		});
	}


	// Returns positions of images in which they should be slided to the pages
	var getImagesPositionFromBottom = function (images) {
		
		var imagesPosition = [],
			windowHeight = $(window).height();

		images.each(function (index, elem) {
			imagesPosition[index] = $(elem).offset().top - windowHeight / 1.2;
		});	

		return imagesPosition;
	};
  

	// Returns difference between image position and current scroll position which will be used for timing slide of image 
  	var getImagesCurrentOffset = function (imagesPosition) {

  		var imagesOffset = [],
  			currentScrollTop = $(window).scrollTop();

  		$.each(imagesPosition, function (index, elem) {
  			imagesOffset[index] = elem - currentScrollTop;
  		});

  		return imagesOffset;

  	};


  	// Ensures sliding of images
	var fadeInFadeOut = function (imagesOffset, images, attr) {

		$.each(imagesOffset, function (index, elem) {
			var $target = $('['+ attr +'="'+ images[index].getAttribute(attr) + '"]');

			if (elem < 0 && elem > -($(window).height()) && ($target.find('img').length > 0 || $target.find('div').length > 0) && $target.attr('data-effect-done') === 'no') {

				$target.css({ position: 'relative', visibility: 'visible'});
		
				switch ($target.attr('data-effect')) {
					case 'slide-right':
						$target.css('right', '100%');
						$target.animate({opacity: 1, right: '0'}, 500);
						break;
					case 'slide-left':
						$target.css('left', '100%');
						$target.animate({opacity: 1, left: '0'}, 500);
						break;
					default:
						$target.css('position', 'static');
						$target.animate({opacity: 1}, 500);
				}

				$target.attr('data-effect-done', 'yes');
			}
		});
	};

	// Ensures parallax behavior of given emelents
	var parallax = function (elem, statingPosition, speed) {
		var $elem = $(elem);

		if ($elem.length > 0) {
			var elemPosition = $elem.offset().top,
				scrolled = $(window).scrollTop();
	  		$elem.css('backgroundPosition', 'center '+ (statingPosition + (elemPosition - scrolled) * speed) +'px');
  		}
	};


	// Runs sliding images and paralax behavior
	var runEffects = function () {
		imagesPosition = getImagesPositionFromBottom($images);
		fadeInFadeOut(getImagesCurrentOffset(imagesPosition), $images, 'data-src');
		parallax('.body-background', bodyBgPosition, 0.3);
		parallax('#relax-its-monday', -600, 0.5);
	};


	// On load and scroll run sliding images and parallax
  	$(window).bind('scroll load', function() {
  		if (isTouch === false) {
  			runEffects();		
  		}
	});


  	// Animated scroll to anchor on link click
	$('a').click(function () {
		$.scrollTo($(this).attr('href'), 500, {offset:0} );
	});


	// Animated scroll to anchor on click on the circle element placed at top of the page
	$('.circle').click(function () {
		$.scrollTo($('#rtf'), 800, {offset:0} );
	});


	// Makes navigation collapsible
	$('nav #dropdown').click(function() {
		$('nav .dropdown-menu').toggle();
		$(this).toggleClass('active');
	});

})(jQuery);