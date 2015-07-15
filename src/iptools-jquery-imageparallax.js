/* globals jQuery */
(function($, document, window) {

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

  IPTImageParallax.prototype.updateViewport = function() {

  };

  IPTImageParallax.prototype.addEventListeners = function() {
    $(document).on('touchstart' + '.' + this._name, null, this, this.updateViewport);
    $(document).on('touchmove' + '.' + this._name, null, this, this.updateViewport);
    $(document).on('touchend' + '.' + this._name, null, this, this.updateViewport);
    $(document).on('touchcancel' + '.' + this._name, null, this, this.updateViewport);
    $(window).on('scroll' + '.' + this._name, null, this, this.updateViewport);
  };

  IPTImageParallax.prototype.destroy = function() {
    $(document).off('.' + this._name);
    $(window).off('.' + this._name);
    this.$element.removeData('plugin_' + pluginName);
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTImageParallax(this, options));
      }
    });
  };

})(jQuery, document, window);
