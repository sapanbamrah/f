/*!
 * Data Tag Helper Class
 * simple helper class for checking, if data-tags are defined and to convert their strings into booleans if necessary
 */
var DataTagHelper = new Object();

//check data tags (target element, data tag string and value to override)
DataTagHelper.setDataTag = function(target, dataTagString, value, isInt){
	//check if data tag is defined
	if ($(target).attr(dataTagString) !== undefined) {
		if($(target).attr(dataTagString) == "true")
		{
			value = true;
		}
		if($(target).attr(dataTagString) == "false")
		{
			value = false;
		}
		
		if(isInt)
		{
			value = parseInt($(target).attr(dataTagString));
		}
		
		return value;
	}
	else{
		return value;
	}
}
