/*
 * This module takes care of custom events on radio and checkbox inputs.
 * These inputs are custom designed on the v8 site. They use font icons instead of default input controls.
 * So the checkInput method checks state (checked/unchecked) of the input and adds/removes class "checked" its related label. 
 * The method ensures the default checkbox/radio which is hidden has correct state as well. 
 */

(function () {

	'use strict';

	var checkInput = function (elem) {
		var $formElem = elem.find('input'),
			elemId = $(elem).attr('id'),
			name;

		if ($formElem.prop('checked') !== true) {

			if ($formElem.attr('type') === 'radio') {
				name = $formElem.attr('name');
				jQuery('input[name='+name+']').removeAttr('checked').parents('label').removeClass('checked');
			}

          	$formElem.prop('checked', true);
			$formElem.triggerHandler('click');
			elem.find('label').addClass('checked');

		} else if ($formElem.attr('type') !== 'radio') {

          	$formElem.prop('checked', false);
			$formElem.triggerHandler('click');			
			elem.find('label').removeClass('checked');	

		}
	};


	jQuery('.radio, .checkbox').unbind('click').click(function(e) {
		e.preventDefault();
		checkInput(jQuery(this));
	});	

})(jQuery);
