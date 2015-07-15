/* globals jQuery */
(function($, document, window) {

  'use strict';

  var pluginName = 'iptImageParallax';

  var defaults = {
    scrollFactor: 0.2
  };

  var settings = null;
  var self = null;

  function IPTImageParallax(element, options) {
    this.$element = $(element);
    self = this;

    settings = $.extend({}, defaults, options);

    addEventListeners();
  }

  IPTImageParallax.prototype.getSettings = function() {
    return settings;
  };

  IPTImageParallax.prototype.updateViewport = function(event) {
    var self = event.data;
    var viewportCenterY = getViewportCenterY();
    var imageCenterY = getImageCenterY(self.$element);
    self.alignImage(viewportCenterY, imageCenterY);
  };

  IPTImageParallax.prototype.alignImage = function(viewportCenterY, imageCenterY) {
    var diffY = viewportCenterY - imageCenterY;
    var offsetY = 50 - (diffY * settings.scrollFactor);
    offsetY = Math.min(offsetY, 100);
    offsetY = Math.max(offsetY, 0);
    this.$element.css('backgroundPosition', '50% ' + parseInt(offsetY, 10) + '%');
  };

  IPTImageParallax.prototype.destroy = function() {
    $(document, window).off('.' + this._name);
    this.$element.removeData('plugin_' + pluginName);
  };

  function addEventListeners() {
    $(document).on('touchstart' + '.' + pluginName, self.updateViewport);
    $(document).on('touchmove' + '.' + pluginName, self.updateViewport);
    $(document).on('touchend' + '.' + pluginName, self.updateViewport);
    $(document).on('touchcancel' + '.' + pluginName, self.updateViewport);
    $(window).on('scroll' + '.' + pluginName, self.updateViewport);
  }

  function getViewportCenterY() {
    var winHeight = window.screen.height ? window.screen.height : window.innerHeight;
    var scrollTop = $(window).scrollTop();
    var centerY = parseInt((winHeight / 2) + scrollTop, 10);
    return centerY;
  }

  function getImageCenterY($element) {
    var offset = $element.offset();
    var top = offset.top;
    var centerY = parseInt(($element.height() / 2) + top, 10);
    return centerY;
  }

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTImageParallax(this, options));
      }
    });
  };

})(jQuery, document, window);
