# iptools-jquery-imageparallax [![Build Status](http://img.shields.io/travis/interactive-pioneers/iptools-jquery-image-parallax.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-image-parallax)

Image parallax plugin

## Features

- Smoothly animated parallax effect for images while scrolling.

## Requirements

- jQuery 1.11.3 or greater

## Example

```html
<div class="image-parallax" style="height: 560px;">
  <div class="image-parallax--image" style="background-image: url('//lorempixel.com/600/600/food/');"></div>
</div>
<link rel="stylesheet" href="styles/styles.css" type="text/css">
<script src="src/iptools-jquery-imageparallax.js"></script>
<script type="text/javascript">
  (function($, document, window) {
    $('.image-parallax--image').iptImageParallax({});
  })(jQuery, document, window);
</script>
```

## Licence
Copyright © 2015-2017 Interactive Pioneers GmbH. Licenced under [GPL-3](LICENSE).
