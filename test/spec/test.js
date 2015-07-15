/* jshint undef: false */
(function() {
  'use strict';

  describe('IPTImageParallax', function() {
    var config = {};
    var pluginName = 'plugin_iptImageParallax';
    var $object = null;

    describe('init', function() {

      beforeEach(function() {
        $object = $('.image-parallax').iptImageParallax(config);
      });

      it('expected to construct object', function() {
        return expect($object).to.be.an.object;
      });

    });

    describe('destroy', function() {

      beforeEach(function() {
        $object = $('.image-parallax').iptImageParallax(config);
      });

      it('expected to remove data', function() {
        $object.data(pluginName).destroy();
        return expect($object.data(pluginName)).to.not.be.ok;
      });

    });
  });

})();
