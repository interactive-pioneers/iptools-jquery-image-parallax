/* globals jQuery */
(function($, document, window) {

  'use strict';

  var pluginName = 'iptImageParallax';

  var defaults = {
    scrollFactor: 0.2
  };

  function IPTImageParallax(collection, options) {
    // currently there is no support for chrome on IOS
    // see: https://code.google.com/p/chromium/issues/detail?id=423444
    if (navigator.userAgent.match('CriOS')) {
      return;
    }

    this.$collection = $(collection);

    this.settings = $.extend({}, defaults, options);

    getBackgroundPositions(this.$collection);
    addEventListeners(this);

    this.updateAllViewport();
  }

  IPTImageParallax.prototype.updateAllViewport = function(event) {
    var self = event ? event.data : this;

    self.$collection.each(function() {
      self.updateViewport($(this));
    });
  };

  IPTImageParallax.prototype.updateViewport = function($element) {
    var viewportCenterY = getViewportCenterY();
    var imageCenterY = getImageCenterY($element);
    var diffY = viewportCenterY - imageCenterY;
    var offsetY = 50 - (diffY * this.settings.scrollFactor);
    var currentBackgroundPosition = $element.data('background-position');

    offsetY = Math.min(offsetY, 100);
    offsetY = Math.max(offsetY, 0);
    offsetY = parseInt(offsetY, 10);

    $element.css('backgroundPosition', currentBackgroundPosition.x + offsetY + '%');
  };

  IPTImageParallax.prototype.destroy = function() {
    $(document, window).off('.' + pluginName);
    this.$collection.each(function() {
      $(this).removeData('plugin_' + pluginName);
    });
  };

  function addEventListeners(instance) {
    $(document)
      .on('touchstart' + '.' + pluginName, null, instance, instance.updateAllViewport)
      .on('touchmove' + '.' + pluginName, null, instance, instance.updateAllViewport)
      .on('touchend' + '.' + pluginName, null, instance, instance.updateAllViewport)
      .on('touchcancel' + '.' + pluginName, null, instance, instance.updateAllViewport);
    $(window).on('scroll' + '.' + pluginName, null, instance, instance.updateAllViewport);
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

  function getBackgroundPositions($collection) {
    var backgroundPosition = {};

    $collection.each(function() {
      backgroundPosition = $(this).css('backgroundPosition').split(' ');
      $(this).data('background-position', {
        x: backgroundPosition[0],
        y: backgroundPosition[1]
      });
    });
  }

  $.fn[pluginName] = function(options) {
    if (!$.data(this, 'plugin_' + pluginName)) {
      $.data(this, 'plugin_' + pluginName, new IPTImageParallax(this, options));
    }
  };

})(jQuery, document, window);
