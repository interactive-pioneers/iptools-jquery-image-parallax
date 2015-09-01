/* globals jQuery */
(function($, document, window) {

  'use strict';

  var pluginName = 'iptImageParallax';

  var dataAttributes = {
    bgPosition: 'background-position'
  };

  var defaults = {
    scrollFactor: 0.2,
    events: ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'scroll']
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
    var viewportCenterY = getViewportCenterY();

    self.$collection.each(function() {
      updateViewport($(this), viewportCenterY, self.settings);
    });
  };

  IPTImageParallax.prototype.destroy = function() {
    $(document, window).off('.' + pluginName);
    this.$collection.removeData('plugin_' + pluginName);
  };

  function updateViewport($element, viewportCenterY, settings) {
    var imageCenterY = getImageCenterY($element);
    var diffY = viewportCenterY - imageCenterY;
    var offsetY = 50 - (diffY * settings.scrollFactor);
    var currentBackgroundPosition = $element.data(dataAttributes.bgPosition);

    offsetY = Math.min(offsetY, 100);
    offsetY = Math.max(offsetY, 0);
    offsetY = parseInt(offsetY, 10);

    $element.css('backgroundPosition', currentBackgroundPosition.x + offsetY + '%');
  }

  function addEventListeners(instance) {
    for (var i = 0; i <= instance.settings.events.length; i++) {
      $(document).on(instance.settings.events[i] + '.' + pluginName, null, instance, instance.updateAllViewport);
    }
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
      $(this).data(dataAttributes.bgPosition, {
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
