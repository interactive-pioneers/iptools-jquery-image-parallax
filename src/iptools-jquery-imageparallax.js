/* globals jQuery */
(function($, document, window) {

  'use strict';

  var pluginName = 'iptImageParallax';

  var defaults = {
    scrollFactor: 0.2
  };

  function IPTImageParallax(element, options) {
    this.$element = $(element);

    this.settings = $.extend({}, defaults, options);
    this.backgroundPosition = getBackgroundPosition(this.$element);

    addEventListeners(this);

    this.updateViewport();
  }

  IPTImageParallax.prototype.updateViewport = function(event) {
    var self = event ? event.data : this;

    var viewportCenterY = getViewportCenterY();
    var imageCenterY = getImageCenterY(self);
    var diffY = viewportCenterY - imageCenterY;
    var offsetY = 50 - (diffY * self.settings.scrollFactor);

    offsetY = Math.min(offsetY, 100);
    offsetY = Math.max(offsetY, 0);
    offsetY = parseInt(offsetY, 10);

    self.$element.css('backgroundPosition', self.backgroundPosition.x + offsetY + '%');
  };

  IPTImageParallax.prototype.destroy = function() {
    $(document, window).off('.' + pluginName);
    this.$element.removeData('plugin_' + pluginName);
  };

  function addEventListeners(instance) {
    $(document)
      .on('touchstart' + '.' + pluginName, null, instance, instance.updateViewport)
      .on('touchmove' + '.' + pluginName, null, instance, instance.updateViewport)
      .on('touchend' + '.' + pluginName, null, instance, instance.updateViewport)
      .on('touchcancel' + '.' + pluginName, null, instance, instance.updateViewport);
    $(window)
      .on('scroll' + '.' + pluginName, null, instance, instance.updateViewport)
      .on('mousewheel' + '.' + pluginName, null, instance, instance.updateViewport);
  }

  function getViewportCenterY() {
    var winHeight = window.screen.height ? window.screen.height : window.innerHeight;
    var scrollTop = $(window).scrollTop();
    var centerY = parseInt((winHeight / 2) + scrollTop, 10);
    return centerY;
  }

  function getImageCenterY(instance) {
    var offset = instance.$element.offset();
    var top = offset.top;
    var centerY = parseInt((instance.$element.height() / 2) + top, 10);
    return centerY;
  }

  function getBackgroundPosition($element) {
    var backgroundPosition = $element.css('backgroundPosition').split(' ');
    return {
      x: backgroundPosition[0],
      y: backgroundPosition[1]
    };
  }

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTImageParallax(this, options));
      }
    });
  };

})(jQuery, document, window);
