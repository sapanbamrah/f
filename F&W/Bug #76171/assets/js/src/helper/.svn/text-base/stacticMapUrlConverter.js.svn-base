/*!
 * Map URl Converter
 * simple helper class for converting the google maps - json object and the google maps markers to a valid HTTP-request string
 */
var StaticMapUrlHelper = new Object();

//IE8 fix for keys and forEach methods
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisArg, t[i], i, t);
    }
  };
}
if (!Object.keys) {
  Object.keys = function(obj) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  };
}

//function to convert the json style data into a static html string
StaticMapUrlHelper.convertGoogleMapsStyle = function(styleJson) {
	var result = [];
	styleJson.forEach(function(v, i, a) {
		var style = '';
		if (v.stylers.length > 0) {// Needs to have a style rule to be valid.
			style += (v.hasOwnProperty('featureType') ? 'feature:' + v.featureType : 'feature:all') + '|';
			style += (v.hasOwnProperty('elementType') ? 'element:' + v.elementType : 'element:all') + '|';
			v.stylers.forEach(function(val, i, a) {
				var propertyname = Object.keys(val)[0];
				var propertyval = new String(val[propertyname]).replace('#', '0x');
				style += propertyname + ':' + propertyval + '|';
			});
		}
		result.push('style=' + encodeURIComponent(style));
	});

	return result.join('&');
};

//function to convert the json marker datat into a static html string
StaticMapUrlHelper.convertGoogleMapsMarkers = function(markerData) {
	var markerUrlString = "";

	$.each(markerData, function(index, dataItem) {
		markerUrlString += "&markers=icon:" + dataItem.icon + "|" + dataItem.lat + "," + dataItem.long;
	});

	return markerUrlString;
}; 