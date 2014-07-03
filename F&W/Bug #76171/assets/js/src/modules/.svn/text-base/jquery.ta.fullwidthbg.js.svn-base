/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 * data-image-vertical-alignment (bottom, top)
 *
 * Images bottom aligned are centered on large monitors over 1200
 *
 */

;(function($, window, document, undefined) {

	// Create the defaults once
	var pluginName = 'fullwidthbg', defaults = {
        largeScreenCenter : 1200 // for bottom alignment adjust for screens over 1200 width
	};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}


	Plugin.prototype.init = function() {
		var scope = this;
		var imageWidth = $(scope.element).find('img').width();
		var imageHeight = $(scope.element).find('img').height();

		scope.imageFactor = imageWidth / imageHeight;
		scope.imageObject = $(scope.element).find('img');

		//check alignment of image by data-tag
		scope.alignment = $(scope.element).attr('data-image-vertical-alignment');

		$(window).resize(function() {
			scope.checkBgImages(scope);
		});

		scope.checkBgImages(scope);
	};

	Plugin.prototype.checkBgImages = function(scope) {
		scope.containerWidth = $(scope.element).width();
		scope.containerHeight = $(scope.element).height();

		//set width of image to 100%
		scope.imageObject.width(scope.containerWidth);
		scope.imageHeight = scope.imageObject.height();

		scope.checkImageAttributes(scope);
	};

	Plugin.prototype.checkImageAttributes = function(scope) {
		//check if image covers the whole container
		if (scope.imageHeight < scope.containerHeight) {
			scope.resizeBgImageHeight(scope);
		} else {
            if (scope.alignment === 'bottom') {
                scope.setImageAlignmentBottom(scope);
            }else{
                scope.setImageAlignment(scope);
            }
            scope.imageObject.css('margin-left', '0px');
		}
	};

	Plugin.prototype.resizeBgImageHeight = function(scope) {
		var imageHeight = $(scope.element).height();
		var imageWidth = imageHeight * scope.imageFactor;
		scope.imageObject.width(imageWidth);
		
		//set image to align horizontal in center
		var marginRight = Math.abs(scope.containerWidth - imageWidth)/2;
		scope.imageObject.css('margin-left', -marginRight + 'px');

        scope.imageObject.css('margin-top', '0px');
	};

    Plugin.prototype.setImageAlignmentBottom = function(scope) {
        //var marginTop = 0;
        var diff = scope.containerHeight - scope.imageHeight;

        var marginTop = diff;
        if (scope.containerWidth > scope.options.largeScreenCenter){
            marginTop = diff/2;
        }
        scope.imageObject.css('margin-top', - Math.abs(marginTop) + 'px');
    };

	Plugin.prototype.setImageAlignment = function(scope) {
        var marginTop = 0;
        scope.imageObject.css('margin-top', marginTop + 'px');
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

	//init all fullwidth objects on page automatically
	$(window).load(function() {
		$(".fullwidth-bg").each(function(index, element) {
			$(this).fullwidthbg();
		});
	});

})(jQuery, window, document);
