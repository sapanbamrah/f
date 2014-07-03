/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 *
 * Custommap Jquery Plugin
 * 
 * imports:
 * helper/staticMapUrlConverter
 * helper/dataTags
 *
 * mapJsonPath : set the path to our map-style json file (String)
 * markerJsonPath : set the path to our marker json file (String)
 * enablenavigation : show or hides the navigation (Boolean)
 * enablezooming : enabled or disables user interaction on the map (Boolean)
 * centerlat : set the lat-geo value of the center (number)
 * centerlong : set the long-geo value of the center (number)
 * zoom : set the zoom value of our map (int)
 *
 */

;(function($, window, document, undefined) {

	// Create the defaults once
	var pluginName = 'custommap', defaults = {
		mapJsonPath : "json/custommap/map-style.json",
		markerJsonPath : "json/custommap/map-marker.json",
		enableNavigation : true,
		enableZooming : true,
		centerlat : -25.850033,
		centerlong : 135.6500523,
		isStaticMap : true,
		imageWidth : 600,
		imageHeight : 300,
		zoom : 4
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
		DataTagHelper.setDataTag(scope.element, 'data-mapstylejson', scope.options.mapJsonPath);
		
		DataTagHelper.setDataTag(scope.element, 'data-mapmarkerjson', scope.options.markerJsonPath);
		
		DataTagHelper.setDataTag(scope.element, 'data-enablenavigation', scope.options.enableNavigation);
		
		DataTagHelper.setDataTag(scope.element, 'data-enablezooming', scope.options.enableZooming);
		
		DataTagHelper.setDataTag(scope.element, 'data-centerlat', scope.options.centerlat);
		
		DataTagHelper.setDataTag(scope.element, 'data-centerlong', scope.options.centerlong);
		
		DataTagHelper.setDataTag(scope.element, 'data-zoom', scope.options.zoom, true);

		//load json data to style the map and add markers
		scope.loadJsonData(scope);
	};

	Plugin.prototype.loadJsonData = function(scope) {
		//get jsonfile to style the map
		$.ajax({
			dataType : "json",
			url : scope.options.mapJsonPath,
			success : function(data) {
				scope.parseJsonMapData(scope, data);
			},
		});

	};

	Plugin.prototype.parseJsonMapData = function(scope, data) {
		//save style map data
		scope.styleJson = data;

		//get jsonfile to set markers with their info windows
		$.ajax({
			dataType : "json",
			url : scope.options.markerJsonPath,
			success : function(data) {
				scope.parseJsonMarkerData(scope, data);
			},
		});
	};

	Plugin.prototype.parseJsonMarkerData = function(scope, data) {

		//save marker data
		scope.markerData = data;

		//init map object if attribute isStatic == false
		if (scope.options.isStaticMap) {
			scope.initStaticMap(scope);
		} else {
			scope.initMap(scope);
		}
	};

	Plugin.prototype.initMap = function(scope) {
		//add map object
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var australiaPoint = new google.maps.LatLng(scope.options.centerlat, scope.options.centerlong);

		var mapOptions = {
			zoom : scope.options.zoom,
			center : australiaPoint,
			disableDefaultUI : !scope.options.enableNavigation,
			scaleControl : scope.options.enableZooming,
			scrollwheel : scope.options.enableZooming,
			draggable : scope.options.enableZooming
		};
		scope.map = new google.maps.Map($(this.element)[0], mapOptions);
		directionsDisplay.setMap(scope.map);

		//style map
		scope.map.setOptions({
			styles : scope.styleJson
		});
		
		//add marker
		$.each(scope.markerData, function(index, dataItem) {
			//create image-icon for marker
			var image = {
				url : dataItem.icon,
				size : new google.maps.Size(dataItem.iconWidth, dataItem.iconHeight),
				anchor : new google.maps.Point(dataItem.iconAnchorX, dataItem.iconAnchorY)
			};

			//create marker
			var marker = new google.maps.Marker({
				position : new google.maps.LatLng(dataItem.lat, dataItem.long),
				map : scope.map,
				icon : image,
				title : String(index)
			});

			scope.markers[index] = marker;
			//create info window
			var infoWindow = new scope.getInfoWindow(scope, dataItem);
			scope.infoWindows[index] = infoWindow;

			//add marker click event
			google.maps.event.addListener(marker, 'click', function() {
				scope.infoWindows[this.title].open(scope.map, scope.markers[this.title]);
			});

		});
	};

	Plugin.prototype.initStaticMap = function(scope) {
		var staticImageUrl = "http://maps.googleapis.com/maps/api/staticmap?center="+scope.options.centerlat+","+scope.options.centerlong+"&zoom="+scope.options.zoom+"&size="+scope.options.imageWidth+"x"+scope.options.imageHeight+"&maptype=roadmap&sensor=false";
		var addedStyes = StaticMapUrlHelper.convertGoogleMapsStyle(scope.styleJson);
		var addedMarkes = StaticMapUrlHelper.convertGoogleMapsMarkers(scope.markerData);
		
		var imageUrl = staticImageUrl +'&'+addedStyes+''+addedMarkes; 
		
		$(scope.element).append('<img src="' + imageUrl + '"/>');
	};

	Plugin.prototype.getInfoWindow = function(scope, dataItem) {
		var infoWindowHTML = '<div class="custommapinfowindow"><h1 class="custommapinfowindow-headline">' + dataItem.headline + '</h1><h3 class="custommapinfowindow-subline">' + dataItem.subline + '</h3><div class="custommapinfowindow-content"><p>' + dataItem.copy + '</p><br><a href="' + dataItem.link + '" target="_blank">' + dataItem.linklabel + '</a></div></div>';
		var infowindow = new google.maps.InfoWindow({
			content : infoWindowHTML,
			maxWidth : dataItem.windowwidth
		});

		return infowindow;
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
