/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 *
 * Custom static iamge map Jquery Plugin
 * 
 * imports:
 * helper/staticMapUrlConverter
 * helper/dataTags
 *
 * mapJsonPath : set the path to our map-style json file (String)
 * markerJsonPath : set the path to our marker json file (String)
 * centerlat : set the lat-geo value of the center (number)
 * centerlong : set the long-geo value of the center (number)
 * zoom : set the zoom value of our map (int)
 * imageWidth : set the image width (int)
 * imageHeight: set the image height (int)
 *
 */

;(function($, window, document, undefined) {

	// Create the defaults once
	var pluginName = 'custommap', defaults = {
		mapJsonPath : "json/custommap/map-style.json",
		centerlat : -25.850033,
		centerlong : 135.6500523,
		imageWidth : 500,
		imageHeight : 400,
		zoom : 4,
		markerlat : -25.850033,
		markerlong : 135.6500523,
		markerImage:"http://extranet.ogilvy.com.au/TA/Styleguide/imgs/custommap/marker.png",
	};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.infoWindows = [];
		this.markers = [];

		//init plugin
		this.init();
	}


	Plugin.prototype.init = function() {
		var scope = this;

		//read out data tags to get json-service-urls
		scope.checkJsonDataTags(scope);
	};

	Plugin.prototype.checkJsonDataTags = function(scope) {
		//read out data tags and override options if necessary
		scope.options.mapJsonPath = DataTagHelper.setDataTag(scope.element, 'data-mapstylejson', scope.options.mapJsonPath);

		scope.options.centerlat =  DataTagHelper.setDataTag(scope.element, 'data-centerlat', scope.options.centerlat);
		
		scope.options.centerlong =  DataTagHelper.setDataTag(scope.element, 'data-centerlong', scope.options.centerlong);

		scope.options.markerlat =  DataTagHelper.setDataTag(scope.element, 'data-markerlat', scope.options.markerlat,true);
		
		scope.options.markerlong =  DataTagHelper.setDataTag(scope.element, 'data-markerlong', scope.options.markerlong,true);
		
		scope.options.markerImage =  DataTagHelper.setDataTag(scope.element, 'data-markerImage', scope.options.markerImage);

		//load json data to style the map and add markers
		scope.loadJsonData(scope);
	};

	Plugin.prototype.loadJsonData = function(scope) {
		//get jsonfile to style the map
		$.ajax({
			dataType : "json",
			url : scope.options.mapJsonPath,
			success : function(data) {
				scope.styleJson = data;
				scope.initStaticMap(scope);
			},
		});

	};

	Plugin.prototype.initStaticMap = function(scope) {
		var staticImageUrl = "http://maps.googleapis.com/maps/api/staticmap?center="+scope.options.centerlat+","+scope.options.centerlong+"&zoom="+scope.options.zoom+"&size="+scope.options.imageWidth+"x"+scope.options.imageHeight+"&maptype=roadmap&sensor=false";
		var addedStyes = StaticMapUrlHelper.convertGoogleMapsStyle(scope.styleJson);
		var markerUrlString = "";
		markerUrlString += "&markers=icon:" + scope.options.markerImage + "|" + scope.options.markerlat + "," + scope.options.markerlong;
		
		var imageUrl = staticImageUrl +'&'+addedStyes+''+markerUrlString; 
		
		console.log(imageUrl);
		
		$(scope.element).append('<img src="' + imageUrl + '"/>');
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
	//init all custommap objects on page automatically -> TBR
	$(window).load(function() {
		$(".custommap").custommap();
	});
})(jQuery, window, document);
