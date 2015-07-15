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

    addEventListeners(this);
  }

  IPTImageParallax.prototype.updateViewport = function(event) {
    var self = event ? event.data : this;
    var viewportCenterY = getViewportCenterY();
    var imageCenterY = getImageCenterY(self);
    var diffY = viewportCenterY - imageCenterY;
    var offsetY = 50 - (diffY * self.settings.scrollFactor);
    offsetY = Math.min(offsetY, 100);
    offsetY = Math.max(offsetY, 0);
    if (self.$element.is('img')) {
      self.$element.css('top', parseInt(offsetY, 10) + 'px');
    } else {
      self.$element.css('backgroundPosition', '50% ' + parseInt(offsetY, 10) + '%');
    }
  };

  IPTImageParallax.prototype.destroy = function() {
    $(document, window).off('.' + pluginName);
    this.$element.removeData('plugin_' + pluginName);
  };

  function addEventListeners(instance) {
    $(document).on('touchstart' + '.' + pluginName, null, instance, instance.updateViewport);
    $(document).on('touchmove' + '.' + pluginName, null, instance, instance.updateViewport);
    $(document).on('touchend' + '.' + pluginName, null, instance, instance.updateViewport);
    $(document).on('touchcancel' + '.' + pluginName, null, instance, instance.updateViewport);
    $(window).on('scroll' + '.' + pluginName, null, instance, instance.updateViewport);
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

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTImageParallax(this, options));
      }
    });
  };

})(jQuery, document, window);
