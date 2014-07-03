(function(window, document, undefined) {
	
})(window, document);

$(document).ready(function(){
    var userAgent = window.navigator.userAgent;
    var IEver = getInternetExplorerVersion();

    function getInternetExplorerVersion() {
        // Returns the version of Windows Internet Explorer or a -1
        // (indicating the use of another browser).
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }
        return rv;
    }

    if (/MSIE (\d+\.\d+);/.test(userAgent)){
        if (IEver < 10){
            $(".image-uploader-message,.image-uploader-input").show();
        }
    } else{
        $(".image-uploader-message,.image-uploader-input").hide();
        //add fastclick
		FastClick.attach(document.body);
    }
});
