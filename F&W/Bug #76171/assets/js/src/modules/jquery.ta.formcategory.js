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
    var pluginName = 'formcategory',
        defaults = {
            primary_category: "", // stored reference to the primary category
            secondary_category: "", // stored reference to the secondary category
            category_input_class: ".category-input", // class name of category input elements
            primary_hidden_reference: "category-primary", // reference (id or class name to hidden input) for primary hidden category
            secondary_hidden_reference: "category-secondary" // reference (id or class name to hidden input) for secondary hidden category

            // adding these overloads the function, left out for now
            // category_primary_reference: "#category-primary", // default reference to the primary category
            //category_secondary_reference: "#category-secondary" // default reference to the secondary category
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
        scope.valueIsSet = false;
        
        //init category inputs
        scope.setupCategoryEvents(scope);
    };

    // add events to categories
    Plugin.prototype.setupCategoryEvents = function(scope) {
        //add click events for navigation buttons

        $(scope.element).find(scope.options.category_input_class).click(function(e){
            scope.categoryClick(scope, e);
        });
    };

    // category item selected
    Plugin.prototype.categoryClick = function (scope, e) {
        var $el = $(e.currentTarget);
        var categories_selected = $(scope.element).find(scope.options.category_input_class + ":checked").length;
        if (categories_selected > 2){
            e.preventDefault();
        }else{
            scope.updatePrimarySecondary(scope, $el, categories_selected);
        }
    };

    // update the primary and secondary categories based on the selected categories
    // rules:   first click selects primary, second click selects secondary,
    //          if first click toggled off then second selection becomes primary selection
    Plugin.prototype.updatePrimarySecondary = function (scope, $el, categories_selected) {
        if (categories_selected === 0){
            scope.flushPrimary(scope, "", "");
             scope.valueIsSet = false;
             $(scope.element).attr('isValid','false');
             $('.categories-box-validation-alert').css("display","block");
             
        }else if (categories_selected === 1){
            scope.setPrimary(scope, $el, $el.attr("id"));
            scope.valueIsSet = true;
            $(scope.element).attr('isValid','true');
            $('.categories-box-validation-alert').css("display","none");
        }else if (categories_selected === 2){
            scope.setSecondary(scope, $el, $el.attr("id"));
             scope.valueIsSet = true;
             $(scope.element).attr('isValid','true');
             $('.categories-box-validation-alert').css("display","none");
        }
    };

    // update primary and secondary category tick state
    // Example: setCategoryClass(scope, "category-primary", "")
    Plugin.prototype.setCategoryClass = function (scope, categoryName, value) {
        if (value === ""){
            $(scope.element).find("#" + categoryName).removeClass("checked");
        }else{
            $(scope.element).find("#" + categoryName).addClass("checked");
        }
    };

    // update primary and secondary category hidden input value
    // Example: setHiddenInput(scope, "category-primary", "")
    Plugin.prototype.setHiddenInput = function (scope, categoryName, value) {
       $(scope.element).find("INPUT[name=" + categoryName + "]").attr("value", value);
    };

    // flush primary tick, primary_category, and input value when primary is selected
    Plugin.prototype.flushPrimary = function (scope, $el, value) {
        //scope.options.primary_category = "";
        scope.setPrimaryCategoryOption(scope, "");
        scope.setCategoryClass(scope, "category-primary", "");
        scope.setHiddenInput(scope, scope.options.primary_hidden_reference, "");
    };

    // set primary tick, primary_category, and input value when primary is selected
    Plugin.prototype.setPrimary = function (scope, $el, value) {
        //scope.options.primary_category = $el;
        scope.setPrimaryCategoryOption(scope, $el);
        scope.setCategoryClass(scope, "category-primary", value);
        scope.setHiddenInput(scope, scope.options.primary_hidden_reference, "");

        scope.checkIfSecondarySwapPrimary(scope, $el, value);
        scope.setSecondary(scope, "", "");
    };

    // set secondary tick, secondary_category, and input value when secondary is selected
    Plugin.prototype.setSecondary = function (scope, $el, value) {
        if($el !== scope.options.secondary_category){
            scope.setCategoryClass(scope, "category-secondary", value);
            scope.setHiddenInput(scope, scope.options.secondary_hidden_reference, value);
        }else{
            scope.setCategoryClass(scope, "category-secondary", "");
            scope.setHiddenInput(scope, scope.options.secondary_hidden_reference, "");
        }
        scope.setSecondaryCategoryOption(scope, $el);
    };

    // set the stored value for the selected primary category (refers to the element input selected)
    Plugin.prototype.setPrimaryCategoryOption = function (scope, value) {
        scope.options.primary_category = value;
    };

    // set the stored value for the selected secondary category (refers to the element input selected)
    Plugin.prototype.setSecondaryCategoryOption = function (scope, value) {
        scope.options.secondary_category = value;
    };

    // check if we need to swap the secondary selection with the primary selection
    Plugin.prototype.checkIfSecondarySwapPrimary = function (scope, $el, value) {
        //scope.options.secondary_category !== "" &&
        if ($el !== scope.options.secondary_category){
            // swap in current selected item as primary incase the primary was selected
            var current_primary_id = $(scope.element).find(scope.options.category_input_class + ":checked").attr("id");
            //$(scope.element).find("INPUT[name=category-primary]").attr("value", current_primary_id);
            scope.setHiddenInput(scope, scope.options.primary_hidden_reference, current_primary_id);
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

})( jQuery, window, document );
