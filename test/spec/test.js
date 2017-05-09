/* global expect */

(function() {
  'use strict';

  describe('IPTImageParallax', function() {

    var config = {
      scrollFactor: 0.3
    };
    var pluginName = 'plugin_iptImageParallax';
    var selector = '.img-parallax';
    var object = null;

    describe('init', function() {

      beforeEach(function() {
        object = $(selector).iptImageParallax(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        return expect(object).to.be.an.object;
      });

    });

    describe('updateViewport', function() {

      beforeEach(function() {
        object = $(selector).iptImageParallax(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected to set/update backgroundPosition', function() {
        return expect(object.css('backgroundPosition')).to.match(/^[0-9]{0,2}.%\s[0-9]{0,2}.%$/);
      });

    });

    describe('destroy', function() {

      beforeEach(function() {
        object = $(selector).iptImageParallax(config);
      });

      it('expected to remove data', function() {
        object.data(pluginName).destroy();
        return expect(object.data(pluginName)).to.not.be.ok;
      });

    });

  });

})();
