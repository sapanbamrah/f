/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 * ..............................................................................
 *
 * Navbar Jquery Plugin
 *
 */

;(function($, window, document, undefined) {

    // Create the defaults once
    var pluginName = 'navbar', defaults = {
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

        //add clickhander to toggle buttons for mobile view
        $(scope.element).find('.navbar-mobile-open-icon').click(function() {
            scope.openMenu(scope);
        });
        $(scope.element).find('.navbar-mobile-close-icon').click(function() {
            scope.closeMenu(scope);
        });
        $(scope.element).find('.navbar-search-icon').click(function() {
            scope.openSearchBox(scope);
        });

        //check if menuitems have subitems to show
        $(scope.element).find('.navbar-subitems').each(function(index, element) {
            element.showSubnaviState = false;
            //click event for showing the submenu
            $(element).parent().find('a').click(function() {
                //open the menu for mobile as well
                scope.openMenu(scope);
                //open the submenu for mobile or dekstop
                scope.showSubMenu(element, scope);
            });
        });

        //clickhandeler for IE8
        if($(scope.element).find('.navbar-subitems').length == 0){
            $('.navbar-item-active-subitem').each(function(index, element){
                //click event for showing the submenu
                $(element).click(function() {
                    if(element.showSubnaviState){
                        element.showSubnaviState = false;
                        scope.showIeSubmenu(element);
                    }else{
                        element.showSubnaviState = true;
                        scope.hideIeSubmenu(element);
                    }
                });
            });
        }

        //back button listener
        $(scope.element).find('.navbar-mobile-back-icon').click(function() {
            //hide submenu for mobile back button
            scope.hideSubMenu(scope);
        });

        //remove css transition after class was attached
        $(scope.element).find('.navbar-items').on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
            function() {$(scope.element).find('.navbar-items').addClass("navbar-removeanimations");}
        );
    };

    Plugin.prototype.openSearchBox = function(scope) {
        $('.nav-bar-panel-container').slideToggle( "slow", function() {
            // Animation complete.
        });
    };

    Plugin.prototype.openMenu = function(scope) {
        //tween menu by css class only if it is first level
        $(scope.element).find('.navbar-items').each(function(index, element) {
            if (!$(element).hasClass('navbar-subitems')) {
                $(element).removeClass('navbar-removeanimations');
                $(element).removeClass('navbar-items-hide');
                $(element).toggleClass('navbar-items-show');
            }
        });

        //hide toggle icon
        $(scope.element).find('.navbar-mobile-open-icon').removeClass('navbar-show-icon');
        $(scope.element).find('.navbar-mobile-open-icon').addClass('navbar-hide-icon');

        //hide search icon
        //$(scope.element).find('.navbar-search-icon').removeClass('navbar-show-icon');
        //$(scope.element).find('.navbar-search-icon').addClass('navbar-hide-icon');

        //hide brand icon
        //$(scope.element).find('.navbar-header').removeClass('navbar-show-icon-inline');
        //$(scope.element).find('.navbar-header').addClass('navbar-hide-icon');

        //show close icon
        $(scope.element).find('.navbar-mobile-close-icon').removeClass('navbar-hide-icon');
        $(scope.element).find('.navbar-mobile-close-icon').addClass('navbar-show-icon');

        //show head-label item
        $(scope.element).find('.navbar-mobile-head-label').removeClass('navbar-hide-icon');
        $(scope.element).find('.navbar-mobile-head-label').addClass('navbar-show-icon');

        //show head border
        $(scope.element).find('.navbar-mobile-head').removeClass('navbar-head-hide-border');
        $(scope.element).find('.navbar-mobile-head').addClass('navbar-head-show-border');

        //set menu header to active
        $(scope.element).removeClass('navbar-inactive');
        $(scope.element).addClass('navbar-active');
    };

    Plugin.prototype.closeMenu = function(scope,element) {
        //close navbar items
        Plugin.prototype.closeAllNavbarItems(scope);

        //show toggle icon
        $(scope.element).find('.navbar-mobile-open-icon').removeClass('navbar-hide-icon');
        $(scope.element).find('.navbar-mobile-open-icon').addClass('navbar-show-icon');
        //hide search icon
        //$(scope.element).find('.navbar-search-icon').removeClass('navbar-hide-icon');
        //$(scope.element).find('.navbar-search-icon').addClass('navbar-show-icon');

        //hide brand icon
        //$(scope.element).find('.navbar-header').removeClass('navbar-hide-icon');
        //$(scope.element).find('.navbar-header').addClass('navbar-show-icon-inline');
        //hide back icon
        $(scope.element).find('.navbar-mobile-back-icon').removeClass('navbar-show-icon');
        $(scope.element).find('.navbar-mobile-back-icon').addClass('navbar-hide-icon');
        //hide close icon
        $(scope.element).find('.navbar-mobile-close-icon').removeClass('navbar-show-icon');
        $(scope.element).find('.navbar-mobile-close-icon').addClass('navbar-hide-icon');

        //show head-label item
        $(scope.element).find('.navbar-mobile-head-label').removeClass('navbar-show-icon');
        $(scope.element).find('.navbar-mobile-head-label').addClass('navbar-hide-icon');

        //hide head border
        $(scope.element).find('.navbar-mobile-head').removeClass('navbar-head-show-border');
        $(scope.element).find('.navbar-mobile-head').addClass('navbar-head-hide-border');

        //set menu header to active
        $(scope.element).removeClass('navbar-active');
        $(scope.element).addClass('navbar-inactive');

        //switch drop down icon style
        $(element).parent().find('.navbar-item-dropdown-icon').removeClass('navbar-item-dropdown-icon-active');
        $(element).parent().find('.navbar-item-dropdown-icon').addClass('navbar-item-dropdown-icon-inactive');
    };

    Plugin.prototype.showSubMenu = function(element, scope) {
        if (element.showSubnaviState) {
            //hide menu for mobile as well
            scope.closeMenu(scope,element);
            element.showSubnaviState = false;
        } else {
            //close
            scope.closeMainOpenSubNavbarItems(scope, element);
            element.showSubnaviState = true;
        }


    };

    Plugin.prototype.hideSubMenu = function(scope,element) {
        //hide submenu show main menu
        $(scope.element).find('.navbar-items').each(function(index, elementInner) {
            if ($(elementInner).hasClass('navbar-subitems')) {
                //tween menu by css class
                $(elementInner).removeClass('navbar-removeanimations');
                $(elementInner).removeClass('navbar-subitems-show');
                $(elementInner).toggleClass('navbar-subitems-hide');

                elementInner.showSubnaviState = false;
            } else {
                //tween menu by css class
                $(elementInner).removeClass('navbar-removeanimations');
                $(elementInner).removeClass('navbar-items-hide');
                $(elementInner).toggleClass('navbar-items-show');
            }
        });

        //hide back icon
        $(scope.element).find('.navbar-mobile-back-icon').removeClass('navbar-show-icon');
        $(scope.element).find('.navbar-mobile-back-icon').addClass('navbar-hide-icon');
    };

    //---------------------> OPEN AND CLOSE FUNCTION TO SHOW AND HIDE MAIN AND SUBMENU <---------------------------
    Plugin.prototype.closeAllNavbarItems = function(scope) {
        //hide main menu and submenu
        $(scope.element).find('.navbar-items').each(function(index, elementInner) {
            if ($(elementInner).hasClass('navbar-subitems')) {
                //tween menu by css class
                $(elementInner).removeClass('navbar-removeanimations');
                $(elementInner).removeClass('navbar-subitems-show');
                $(elementInner).toggleClass('navbar-subitems-hide');

                //set dropdown icon
                $(elementInner).parent().find('.navbar-item-dropdown-icon').removeClass('navbar-item-dropdown-icon-active');
                $(elementInner).parent().find('.navbar-item-dropdown-icon').addClass('navbar-item-dropdown-icon-inactive');

                elementInner.showSubnaviState = false;
            } else {
                //tween menu by css class
                $(elementInner).removeClass('navbar-removeanimations');
                $(elementInner).removeClass('navbar-items-show');
                $(elementInner).toggleClass('navbar-items-hide');
            }
        });
    };

    Plugin.prototype.closeMainOpenSubNavbarItems = function(scope, element) {
        //hide main menu show submenu
        $(scope.element).find('.navbar-items').each(function(index, elementInner) {
            if ($(elementInner).hasClass('navbar-subitems')) {
            } else {
                //tween menu by css class
                $(elementInner).removeClass('navbar-removeanimations');
                $(elementInner).removeClass('navbar-items-show');
                $(elementInner).toggleClass('navbar-items-hide');
            }
        });

        //tween menu by css class
        $(element).removeClass('navbar-removeanimations');
        $(element).removeClass('navbar-subitems-hide');
        $(element).toggleClass('navbar-subitems-show');


        //show back icon
        $(scope.element).find('.navbar-mobile-back-icon').removeClass('navbar-hide-icon');
        $(scope.element).find('.navbar-mobile-back-icon').addClass('navbar-show-icon');
        //switch drop down icon style
        $(element).parent().find('.navbar-item-dropdown-icon').removeClass('navbar-item-dropdown-icon-inactive');
        $(element).parent().find('.navbar-item-dropdown-icon').addClass('navbar-item-dropdown-icon-active');
    };

    Plugin.prototype.showIeSubmenu = function(element){
        $('.navbar-subitems').removeClass('navbar-subitems-ie-show');
        $('.navbar-subitems').addClass('navbar-subitems-ie-hide');

        $('.navbar-item-dropdown-icon').removeClass('navbar-item-dropdown-icon-inactive');
        $('.navbar-item-dropdown-icon').addClass('navbar-item-dropdown-icon-active');
    };
    Plugin.prototype.hideIeSubmenu = function(element){
        $('.navbar-subitems').removeClass('navbar-subitems-ie-hide');
        $('.navbar-subitems').addClass('navbar-subitems-ie-show');

        $('.navbar-item-dropdown-icon').removeClass('navbar-item-dropdown-icon-active');
        $('.navbar-item-dropdown-icon').addClass('navbar-item-dropdown-icon-inactive');
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
        $(".navbar").navbar();
    });
})(jQuery, window, document);
