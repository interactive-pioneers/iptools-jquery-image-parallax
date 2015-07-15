/* globals jQuery */
(function($, document, window) {

  'use strict';

  var pluginName = 'iptImageParallax';

  var defaults = {
    scrollFactor: 0.2
  };

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

  function IPTImageParallax(element, options) {
    this.$element = $(element);
    this.$image = $(element).find('.image-parallax--image');
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  IPTImageParallax.prototype.init = function() {
    this.addEventListeners();
  };

  IPTImageParallax.prototype.updateViewport = function(event) {
    var self = event.data;
    var viewportCenterY = getViewportCenterY();
    var imageCenterY = getImageCenterY(self.$image);
    self.alignImage(viewportCenterY, imageCenterY);
  };

  IPTImageParallax.prototype.alignImage = function(viewportCenterY, imageCenterY) {
    var diffY = viewportCenterY - imageCenterY;
    var offsetY = 50 - (diffY * this.settings.scrollFactor);
    offsetY = Math.min(offsetY, 100);
    offsetY = Math.max(offsetY, 0);
    this.$image.css('backgroundPosition', '50% ' + parseInt(offsetY, 10) + '%');
  };

  IPTImageParallax.prototype.addEventListeners = function() {
    $(document).on('touchstart' + '.' + this._name, null, this, this.updateViewport);
    $(document).on('touchmove' + '.' + this._name, null, this, this.updateViewport);
    $(document).on('touchend' + '.' + this._name, null, this, this.updateViewport);
    $(document).on('touchcancel' + '.' + this._name, null, this, this.updateViewport);
    $(window).on('scroll' + '.' + this._name, null, this, this.updateViewport);
  };

  IPTImageParallax.prototype.destroy = function() {
    $(document, window).off('.' + this._name);
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
