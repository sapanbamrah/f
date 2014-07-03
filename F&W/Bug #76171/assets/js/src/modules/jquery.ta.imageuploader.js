/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 *
 * Search Input Jquery Plugin
 *
 * Handles search input field when changed
 *
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'imageuploader',
        defaults = {
            image_uploader_item : ".image-uploader-item",
            image_uploader_add_more : ".image-uploader-add-more",
            image_uploader_add_more_button : ".image-uploader-add-more-button",
            image_uploader_remove_button : ".image-uploader-remove-button",
            image_uploader_control : ".image-uploader-control",
            image_uploader_filename : ".image-uploader-filename"
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
        //init events
        scope.setupEvents(scope);
    };

    // add events to items
    Plugin.prototype.setupEvents = function(scope) {
        var $el = $(scope.element);
        var $image_uploader_item = $el.find(scope.options.image_uploader_item);
        var $image_uploader_add_more = $el.find(scope.options.image_uploader_add_more);
        var $image_uploader_add_more_button = $el.find(scope.options.image_uploader_add_more_button);

        $image_uploader_add_more_button.click(function(e) {
            var $latest_image_uploader_item = $image_uploader_item.clone().insertBefore($image_uploader_add_more);//This will clone the original Upload control and add before the Upload More link
            $latest_image_uploader_item.find(scope.options.image_uploader_filename).text('No File');//after cloning, it might copy the File Name if selected for first Upload
            e.preventDefault();
        });

        //Remove Whole Image Uploader item
        $el.on('click', scope.options.image_uploader_remove_button , function(e){
            $(this).parent().parent().remove();
            e.preventDefault();
        });

        //When File is selected in upload control, it will update the span label under it.
        $el.on('change', scope.options.image_uploader_control , function(e){
            var $image_uploader_filename = $(this).parent().parent().find(scope.options.image_uploader_filename);
            $image_uploader_filename.text($(this).val());
        });

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

    //init all search input objects on page automatically -> TBR
    $(window).load(function() {
        $(".image-uploader").imageuploader();
    });

})( jQuery, window, document );
