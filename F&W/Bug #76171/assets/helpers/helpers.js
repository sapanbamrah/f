'use strict';


module.exports.register = function(Handlebars, options) {

    // Render a partial and pass in some data
    // Example Usage:
    //      {{#parseJSON '{"category_id": "category-wine-story", "category_icon" : "icon-font-restaurants", "title": "Restaurants", "description": "Restaurants, desc..."}'}}
    //          {{> category_item}}
    //      {{/parseJSON}}
    //  .hbs: <a href="#" class="btn-share icon-font-{{category_icon}}"><span>{{text}}</span></a>
    Handlebars.registerHelper('parseJSON', function(data, options) {
        return options.fn(JSON.parse(data));
    });

};
