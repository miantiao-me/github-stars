---
project: gulp-fontmin
stars: 80
description: |-
    Minify font seamlessly
url: https://github.com/ecomfe/gulp-fontmin
---

# gulp-fontmin

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]
[![Font support][font-image]][font-url]

[downloads-image]: http://img.shields.io/npm/dm/gulp-fontmin.svg
[npm-url]: https://npmjs.org/package/gulp-fontmin
[npm-image]: http://img.shields.io/npm/v/gulp-fontmin.svg

[travis-url]: https://travis-ci.org/ecomfe/gulp-fontmin
[travis-image]: http://img.shields.io/travis/ecomfe/gulp-fontmin.svg

[dep-url]: https://david-dm.org/ecomfe/gulp-fontmin
[dep-image]: http://img.shields.io/david/ecomfe/gulp-fontmin.svg

[font-image]:https://img.shields.io/badge/font-senty-blue.svg
[font-url]: http://font.sentywed.com/

> Minify TTF font to SVG, EOT, WOFF with [fontmin](https://github.com/ecomfe/fontmin)

## Install

```
$ npm install --save-dev gulp-fontmin
```

## Usage

```js
var gulp = require('gulp');
var fontmin = require('gulp-fontmin');

gulp.task('default', function () {
    return gulp.src('src/fonts/*.ttf')
        .pipe(fontmin({
            text: '天地玄黄 宇宙洪荒',
        }))
        .pipe(gulp.dest('dist/fonts'));
});
```


## API

### fontmin(options)

Options:

* `text`: A string corresponding glyphs of ttf
* `onlyChinese`: {boolean} keep chinese only, exclude Latin, number and symbol. Default = false
* `fontPath`: {string=} location of font file.
* `hinting`: {boolean=} keep hint info, defaults true.
* `quiet`: {boolean=} print how many fonts were effected, defaults false.


## Practice

### Get needed text from html

```js

function minifyFont(text, cb) {
    gulp
        .src('src/font/*.ttf')
        .pipe(fontmin({
            text: text
        }))
        .pipe(gulp.dest('dest/font'))
        .on('end', cb);
}

gulp.task('fonts', function(cb) {

    var buffers = [];

    gulp
        .src('index.html')
        .on('data', function(file) {
            buffers.push(file.contents);
        })
        .on('end', function() {
            var text = Buffer.concat(buffers).toString('utf-8');
            minifyFont(text, cb);
        });

});
```

## Related

- [gulp-fontmin-demo](https://github.com/junmer/gulp-fontmin-demo)
- [fontmin](https://github.com/ecomfe/fontmin)
- [fontmin-app](https://github.com/ecomfe/fontmin-app)

## License

MIT

