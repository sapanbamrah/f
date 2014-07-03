/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 *
 * Form Category Jquery Plugin
 *
 * primary_category : category reference to first selected item
 * secondary_category : category reference to second selected item
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'video',
        defaults = {
            video_container: ".video-container", // video container
            video_close_btn: ".video-close-btn", // video close button within container
            video_data_type: "data-video-button", // all videos on page will trigger showVideoContainer with the data defining what video is selected
            video_is_active_target : ".form-hero" //Apply additional class to apply class on main-content to manage z-index issues with global navigation.
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        var scope = this;
        //init category inputs
        scope.setupEvents(scope);
        //console.log("init-video");
    };

    // add events
    Plugin.prototype.setupEvents = function(scope) {
        //add click events for buttons

        $(scope.element).find(scope.options.video_close_btn).click(function(e){
            scope.closeClick(scope, e);
        });

        $("A[" + scope.options.video_data_type + "]").click(function(e){
            scope.showVideoContainer(scope, e);
        });

    };

    // close button selected
    Plugin.prototype.closeClick = function (scope, e) {
        var $el = $(e.currentTarget);
        $(scope.options.video_container).removeClass("is-active");
        $(scope.options.video_is_active_target).removeClass("is-active");
        e.preventDefault();
    };

    // show video container
    Plugin.prototype.showVideoContainer = function (scope, e) {
        var $el = $(e.currentTarget);
        
        //compare, if data tag of button and video container id fit
        var buttonVideoIdTag = $(e.currentTarget).attr('data-video-button');
        var containerID = $(scope.options.video_container).attr('id');
        
        if(buttonVideoIdTag == containerID){
        	$(scope.options.video_container).addClass("is-active");
            $(scope.options.video_is_active_target).addClass("is-active");

            console.log($(scope.options.video_is_active_target));

        	//console.log("play-video:" + $el.attr(scope.options.video_data_type));
        	e.preventDefault();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin( this, options ));
            }
        });
    };
    
    //init all carousel objects on page automatically -> TBR
	$(window).load(function() {
		$(".video-container").video();
	});

})( jQuery, window, document );
