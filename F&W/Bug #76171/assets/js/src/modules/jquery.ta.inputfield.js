/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 *
 * Input field Jquery Plugin
 *
 */
var inputfields = [];
;(function($, window, document, undefined) {

	// Create the defaults once
	var pluginName = 'inputfield', defaults = {
	};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		
		//init plugin
		this.init();
	}

	Plugin.prototype.init = function() {
		var scope = this;

		$(scope.element).find('.input-field-input').focus(function() {
			$(scope.element).addClass('input-field-focus');
		});
		
		$(scope.element).find('.input-field-input').blur(function() {
			$(scope.element).removeClass('input-field-focus');
		});
		
		$(scope.element).find('input').blur(function() {
			scope.validateField(scope);
		});
		
		$(scope.element).find('select').blur(function() {
			scope.validateField(scope);
		});
		
		$(scope.element).find('.checkbox').blur(function() {
			scope.validateField(scope);
		});
		
		//disable paste function
		var verifyField = document.getElementById('verifymail');
		 verifyField.onpaste = function(e) {
		   e.preventDefault();
		 };
	};
	
	Plugin.prototype.initInputBoxes = function(scope){
		$(scope.element).find('.description-box-input-field').focus(function() {
			var boxElement = $(scope.element).parent();
			var isBoxInner = boxElement.hasClass('description-box-outer');
			
			if(!isBoxInner)
			$(scope.element).parent().addClass('input-field-focus');
		});
		
		$(scope.element).find('.description-box-input-field').blur(function() {
			$(scope.element).parent().removeClass('input-field-focus');
		});
	};

	Plugin.prototype.validateField = function(scope) {
		var isValid = false;
		var scopeElement = $(scope.element);
		var inputField = scopeElement.find('.input-field-input');
		var inputFieldVal = inputField.val();
		var selectBox = scopeElement.find('select');
		var checkBox = scopeElement.find('.checkbox');

		switch($(scope.element).attr('data-type')) {
			case "text":
				isValid = scope.isValidText(inputFieldVal);
				break;
			case "mail":
				isValid = scope.isValidMail(inputFieldVal);
				break;
			case "verify-mail":
				isValid = scope.isValidVerifyMail(inputFieldVal);
				break;
			case "select":
				isValid = scope.isValidSelect(selectBox);
				break;
			case "number":
				isValid = scope.isValidPhoneNumber(inputFieldVal);
				break;
			case "checkbox":
				isValid = scope.isValidCheckbox(checkBox);
				break;
		}

		scope.setValidation(scope, isValid);
	};

	Plugin.prototype.setValidation = function(scope, isValid) {
		var inputFieldIcon = $(scope.element).find('.input-field-validation-icon');
		var inputFieldValidation = $(scope.element).find('.input-field-validation-alert');
		var scopeElement = $(scope.element);
		
		if (isValid) {
			inputFieldIcon.removeClass('input-field-validation-icon-false');
			inputFieldIcon.addClass('input-field-validation-icon-true');

			inputFieldValidation.removeClass('input-field-validation-show');
			inputFieldValidation.addClass('input-field-validation-hide');
			
			scopeElement.attr("data-isValid","true");
		} else {
			inputFieldIcon.removeClass('input-field-validation-icon-true');
			inputFieldIcon.addClass('input-field-validation-icon-false');

			inputFieldValidation.removeClass('input-field-validation-hide');
			inputFieldValidation.addClass('input-field-validation-show');
			
			scopeElement.attr("data-isValid","false");
		}
	};

	Plugin.prototype.isValidText = function(inputValue) {
		if (inputValue !== "") {
			return true;
		} else {
			return false;
		}
	};
	Plugin.prototype.isValidMail = function(inputValue) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(inputValue);
	};
	Plugin.prototype.isValidVerifyMail = function(inputValue) {
		if(inputValue === $('#mail').val() && inputValue !== "")
		{
			return true;
		}else{
			return false;
		}
	};
	Plugin.prototype.isValidSelect = function(element){
		if($(element).val() === null){
			return false;
		}else{
			return true;
		}
	};
	Plugin.prototype.isValidCheckbox = function(element){
		if($(element).is(':checked')){
			return true;
		}else{
			return false;
		}
	};
	Plugin.prototype.isValidNumber = function(inputValue) {
		var filter = /^[0-9-+]+$/;
		return filter.test(inputValue);
	};
	Plugin.prototype.isValidPhoneNumber = function(inputValue){
        var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{1})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        var phoneno2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
        var phoneno3 = /^\+?([0-9]{4})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;

        return phoneno.test(inputValue) || phoneno2.test(inputValue) || phoneno3.test(inputValue);

	};
	
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery, window, document);

//init all carousel objects on page automatically -> TBR
$(window).load(function() {
	//init input fields
	$(".input-field").each(function(index, element){
		var inputfield = $(element).inputfield();
		inputfields.push(inputfield);
	});
	
	$(".description-box").each(function(index, element){
		$(element).inputfield();
	});
});

//external validation function for submit buttons
function validateForm() {
	//check all input fields an call validation form
	$(inputfields).each(function(index, element){
		//for input fields
		element.find('input').blur();
		//for select boxes
		element.find('select').blur();
		//for select checkboxes
		element.find('checkbox').blur();
		
		element.blur();
	});
	
	//check if all fields are valid
	var errors = 0;
	var errorObjects = [];
	
	$(inputfields).each(function(index, element){
		if($(element).attr('data-isValid') !== "true"){
			errorObjects.push(element);
			errors++;
		}
		
		//check categories box
		if($('.categories-box').attr('isValid') === 'true'){
			$('.categories-box-validation-alert').css("display","none");
		}else{
			$('.categories-box-validation-alert').css("display","block");
			
			errors++;
		}
		
		if(errors > 0)
		{
			//scroll to first error
			$("html, body").animate({ scrollTop: $(errorObjects[0]).offset().top }, 500);	
					
			return false;
		}else{
			return true;
		}
	});
}
