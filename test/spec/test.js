/* jshint undef: false */
(function() {
  'use strict';

  describe('IPTImageParallax', function() {

    var config = {};
    var pluginName = 'plugin_iptImageParallax';
    var selector = '.img-parallax';
    var $collection = null;

    describe('init', function() {

      beforeEach(function() {
        $collection = $(selector).iptImageParallax(config);
      });

      afterEach(function() {
        $collection.each(function() {
          $(this).data(pluginName).destroy();
        });
      });

      /*it('expected to construct object', function() {
        return expect($collection).to.be.an.object;
      });*/

    });

    describe('updateViewport', function() {

      beforeEach(function() {
        $collection = $(selector).iptImageParallax(config);
      });

      afterEach(function() {
        $collection.data(pluginName).destroy();
      });

      /*it('expected to set/update backgroundPosition', function() {
        return expect($collection.css('backgroundPosition')).to.match(/^[0-9]{0,2}.%\s[0-9]{0,2}.%$/);
      });*/

    });

    describe('destroy', function() {

      beforeEach(function() {
        $collection = $(selector).iptImageParallax(config);
      });

      /*it('expected to remove data', function() {
        $collection.data(pluginName).destroy();
        return expect($collection.data(pluginName)).to.not.be.ok;
      });*/

    });

  });

})();
