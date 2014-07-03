/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 *
 * Carousel Jquery Plugin
 *
 * slideTime : slider animation time in ms
 * disableCarouselonDesktop : disables the functionality of the carousel on desktop views
 * mobileMaxResolution : set the mobile max resolution for our brakepoint to desktop
 */

;(function($, window, document, undefined) {

	// Create the defaults once
	var pluginName = 'mapwrapper', defaults = {
		mobileMaxResolution : 990,
		smallBreakpoint : 0,
		mediumBreakpoint : 1167
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
		var screenWidth = $(window).width();

		//add resize event to check screen resolution
		$(window).resize(function() {
			screenWidth = $(window).width();

            scope.updateIconPagination(scope, screenWidth);

		});

		$(window).trigger('resize');
	};

    Plugin.prototype.updateIconPagination = function(scope, width) {

        if ( width < scope.options.mediumBreakpoint ) {
            $(scope.element).find('.icon-map').addClass('icon-map-small');
        } else {
            $(scope.element).find('.icon-map-small').removeClass('icon-map-small');
        }
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
	//init all carousel objects on page automatically -> TBR
	$(window).load(function() {
		$(".icon-map-wrapper").mapwrapper();
	});
})(jQuery, window, document);
