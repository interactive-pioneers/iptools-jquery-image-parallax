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

## Contributions

### Development
- `npm i`
- `bower i`

### Bug reports, suggestions

- File all your issues, feature requests [here](https://github.com/interactive-pioneers/iptools-jquery-imageparallax/issues)
- If filing a bug report, follow the convention of _Steps to reproduce_ / _What happens?_ / _What should happen?_
- __If you're a developer, write a failing test instead of a bug report__ and send a Pull Request

### Code

1. Fork it ( https://github.com/[my-github-username]/iptools-jquery-imageparallax )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Develop your feature by concepts of [TDD](http://en.wikipedia.org/wiki/Test-driven_development), see [Tips](#tips)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

### Tips

Following tasks are there to help with development:

- `grunt watch:bdd` listens to tests and source, reruns tests
- `grunt qa` run QA task that includes tests and JSHint
- `grunt build` minify source to dist/

## Licence
Copyright © 2015 Interactive Pioneers GmbH. Licenced under [GPLv3](LICENSE).
