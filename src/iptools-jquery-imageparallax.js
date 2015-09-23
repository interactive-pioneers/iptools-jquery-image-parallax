/* globals jQuery */
(function($, document, window) {

  'use strict';

  var pluginName = 'iptImageParallax';

  var dataAttributes = {
    bgPosition: 'background_position',
    offsetTop: 'offset_top'
  };

  var defaults = {
    scrollFactor: 0.2,
    maxRange: 5,
    events: ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'scroll']
  };

  var self = null;
  var $element = null;
  var viewportCenterY = 0;
  var imageCenterY = 0;
  var diffY = 0;
  var offsetY = 0;
  var currentBackgroundPosition = 0;
  var offset = null;
  var top = 0;
  var centerY = 0;
  var winHeight = 0;
  var scrollTop = 0;
  var backgroundPosition = '';

  function IPTImageParallax(collection, options) {
    // currently there is no support for chrome on IOS
    // see: https://code.google.com/p/chromium/issues/detail?id=423444
    if (navigator.userAgent.match('CriOS')) {
      return;
    }

    this.$collection = $(collection);

    this.settings = $.extend({}, defaults, options);

    cacheElementProperties(this.$collection);
    addEventListeners(this);

    this.updateAllViewport();
  }

  IPTImageParallax.prototype.updateAllViewport = function(event) {
    self = event ? event.data : this;
    viewportCenterY = getViewportCenterY();

    self.$collection.each(function() {
      updateViewport($(this), viewportCenterY, self.settings);
    });
  };

  IPTImageParallax.prototype.destroy = function() {
    $(document, window).off('.' + pluginName);
    this.$collection.removeData('plugin_' + pluginName);
  };

  function updateViewport($element, viewportCenterY, settings) {
    imageCenterY = getImageCenterY($element);
    diffY = viewportCenterY - imageCenterY;
    offsetY = 50 - (diffY * settings.scrollFactor);
    currentBackgroundPosition = $element.data(dataAttributes.bgPosition);

    offsetY = clamp(offsetY, 0, 100);

    $element.css('backgroundPosition', currentBackgroundPosition.x + offsetY + '%');
  }

  function getViewportCenterY() {
    winHeight = window.screen.height ? window.screen.height : window.innerHeight;
    scrollTop = $(window).scrollTop();
    centerY = parseInt((winHeight * 0.5) + scrollTop, 10);

    return centerY;
  }

  function getImageCenterY($element) {
    return $element.data(dataAttributes.offsetTop);
  }

  function cacheElementProperties($collection) {
    $collection.each(function() {
      $element = $(this);
      backgroundPosition = $element.css('backgroundPosition').split(' ');
      $element.data(dataAttributes.bgPosition, {
        x: backgroundPosition[0],
        y: backgroundPosition[1]
      });

      offset = $element.offset();
      top = offset.top;
      centerY = parseInt(($element.height() * 0.5) + top, 10);
      $element.data(dataAttributes.offsetTop, centerY);
    });
  }

  function handleResize(event) {
    self = event.data;

    cacheElementProperties(self.$collection);
  }

  function clamp(number, min, max) {
    return number < min ? min : number > max ? max : number;
  }

  function addEventListeners(instance) {
    for (var i = 0; i <= instance.settings.events.length; i++) {
      $(document).on(instance.settings.events[i] + '.' + pluginName, null, instance, instance.updateAllViewport);
    }
    $(window).on('resize', null, instance, handleResize);
  }

  $.fn[pluginName] = function(options) {
    if (!$.data(this, 'plugin_' + pluginName)) {
      $.data(this, 'plugin_' + pluginName, new IPTImageParallax(this, options));
    }
  };

})(jQuery, document, window);
