/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 *
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'mosaicgridchanger',
        defaults = {
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
        scope.grid=true;
        
        $(scope.element).find(".mosaicgridchanger-grid-button").click(function(){
        	scope.setGrid(scope,true);
        });
        
        $(scope.element).find(".mosaicgridchanger-list-button").click(function(){
        	scope.setGrid(scope,false);
        });
    };
    
    Plugin.prototype.setGrid = function(scope, isGrid){
    	$(scope.element).find(".mosaicgridchanger-grid-button").removeClass('mosaicgridchanger-button-active');
    	$(scope.element).find(".mosaicgridchanger-list-button").removeClass('mosaicgridchanger-button-active');
    	
    	if(isGrid){
    		$(scope.element).find(".mosaicgridchanger-grid-button").addClass('mosaicgridchanger-button-active');
    		$(".mosaic").each(function(index, element){
    			
    			if(!$(element).hasClass('mosaic-static'))
    			{
    				scope.setBaseGrid(scope,$(element));
    			}
    		});
    		
    	}else{
    		$(scope.element).find(".mosaicgridchanger-list-button").addClass('mosaicgridchanger-button-active');
    		$(".mosaic").each(function(index, element){
    			if(!$(element).hasClass('mosaic-static'))
    			{
    				scope.setListGrid(scope,$(element));
    			}
    		});
    	}
    };
    
    Plugin.prototype.setListGrid = function(scope,mosaic){
    	var colMd6 = mosaic.find('.col-md-6');
    	var colMd3 = mosaic.find('.col-md-3');
    	var colSm6 = mosaic.find('.col-sm-6');
    	
    	var mosaicItems = mosaic.find('.mosaic-item');
    	
    	$(colMd6).each(function(index, element){
    		$(element).removeClass('col-md-6');
    		$(element).addClass('col-reset-md-6');
    	});
    	
    	$(colMd3).each(function(index, element){
    		$(element).removeClass('col-md-3');
    		$(element).addClass('col-reset-md-3');
    	});
    	
    	$(colSm6).each(function(index, element){
    		$(element).removeClass('col-sm-6');
    		$(element).addClass('col-reset-sm-6');
    	});

    	$(mosaicItems).each(function(index, element){
    		$(element).removeClass('mosaic-item-grid');
    		$(element).addClass('mosaic-item-list');
    	});
    };
    
    Plugin.prototype.setBaseGrid = function(scope, mosaic){
    	var colMd6 = mosaic.find('.col-reset-md-6');
    	var colMd3 = mosaic.find('.col-reset-md-3');
    	var colSm6 = mosaic.find('.col-reset-sm-6');
    	
    	var mosaicItems = mosaic.find('.mosaic-item');
    	
    	$(colMd6).each(function(index, element){
    		$(element).removeClass('col-reset-md-6');
    		$(element).addClass('col-md-6');
    	});
    	
    	$(colMd3).each(function(index, element){
    		$(element).removeClass('col-reset-md-3');
    		$(element).addClass('col-md-3');
    	});
    	
    	$(colSm6).each(function(index, element){
    		$(element).removeClass('col-reset-sm-6');
    		$(element).addClass('col-sm-6');
    	});

    	$(mosaicItems).each(function(index, element){
    		$(element).removeClass('mosaic-item-list');
    		$(element).addClass('mosaic-item-grid');
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

})( jQuery, window, document );

//init all carousel objects on page automatically -> TBR
$(window).load(function() {
	$(".mosaicgridchanger").mosaicgridchanger();
});
