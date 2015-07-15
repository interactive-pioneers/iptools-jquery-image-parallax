/* globals jQuery */
(function($) {

  'use strict';

  var pluginName = 'iptImageParallax';

  var defaults = {};

  function IPTImageParallax(element, options) {
    this.$element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  IPTImageParallax.prototype.init = function() {
    this.addEventListeners();
  };

  IPTImageParallax.prototype.addEventListeners = function() {};

  IPTImageParallax.prototype.destroy = function() {
    this.$element.removeData('plugin_' + pluginName);
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTImageParallax(this, options));
      }
    });
  };

})(jQuery);
