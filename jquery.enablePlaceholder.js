/* 
 * EnablePlaceholder jQuery plugin.
 * https://github.com/marioizquierdo/enablePlaceholder
 * version 1.0 (May 11 2011)
 * 
 * Copyright (c) 2011 Mario Izquierdo
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */
(function($){
  // Add jQuery.support.placeholder property to check HTML5 placeholder support
  $.support.placeholder = ('placeholder' in document.createElement('input'));
  
  // Options default values
  var defaults = {
    "withPlaceholderClass": "placeholder"
  };
  
  // jQuery(selector).enablePlaceholder()
  $.fn.enablePlaceholder = function(options) {
    if(!$.support.placeholder) {
      var settings = $.extend({}, defaults, options);
      var showPlaceholder = function(input, placeholder) {
        return input
          .val(placeholder)
          .addClass(settings["withPlaceholderClass"])
          .data('hasPlaceholder', true);
      };
      var clearPlaceholder = function(input, placeholder) {
        if(input.data('hasPlaceholder')) {
          return input
            .val("")
            .removeClass(settings["withPlaceholderClass"])
            .data('hasPlaceholder', false);
        };
      };
      
      return this.each(function(){
        var input = $(this);
        var placeholder = input.attr("placeholder");
        if(placeholder != "") {
          
          // Show placeholder on page load
          if(input.val() == "" || input.val() == placeholder) {
            showPlaceholder(input, placeholder);
          }
          
          // Hide on focus
          input.bind('focus keydown paste', function(){
            clearPlaceholder(input, placeholder);
          });
    
          // Show again if input.val() is empty
          input.bind('blur', function(){
            if(input.val() == "") {
              showPlaceholder(input, input.attr("placeholder"));
            }
          });
          
          // Clear placeholder on form submit
          input.parents('form').first().submit(function(){
            clearPlaceholder(input, placeholder);
            return true;
          });
        }
      });
    };
  };
})(jQuery)