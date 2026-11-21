---
project: InstantPjax
stars: 11
description: |-
    A jQuery Plugin for PJAX with instantclick.
url: https://github.com/willin/InstantPjax
---

# InstantPjax

Not for noob.

## Installation

```shell
bower install instantpjax
```

or download here: 

[https://github.com/willin/InstantPjax/releases](https://github.com/willin/InstantPjax/releases)

or use directly: 

[https://rawgit.com/willin/InstantPjax/dist/instantpjax.min.js](https://rawgit.com/willin/InstantPjax/dist/instantpjax.min.js)

## Usage

First of all, you need to require this js.

```html
<script src="https://rawgit.com/willin/InstantPjax/dist/instantpjax.min.js" type="application/javascript" data-no-ipjax></script>
```

### Ignore Elements

Use `data-no-ipjax` attribute like:

```html
	<h1 data-no-ipjax>Hello World</h1>
```

### 1. Basic

Use: `$.fn.ipjax`

```js
	/*selector,container,config*/
	$(document).ipjax('a','#main',{
		timeout: 10000, //ms
		cache:  3600*24*7, //s, 0 for disable cache
		cacheIgnore: ['/','/news'], //paths that do not cache, default: false
		storage: true, //false for disable localStorage
		delay: 300, //ms, 0 for disable mouse over preloading
		push: true, // true is push, false is replace, null for do nothing
		titleSuffix: '', 
		show: '', // _default/fade or Animation Function(data, callback, isCached)
	});
	$(document).on('ipjax.start',function(){
		//start animation here
		// Example:
		/*
		$('#loading').show();
		*/
	});
	$(document).on('ipjax.end',function(){
		//end animation here
		// Example:
		/*
		$('#loading').hide();
		*/
	});
	$(document).on('ipjax.cached',function(){
		//if cached animation here
		// Example:
		/*
		$($.ipjax.options.element).addClass('cached');
		$($.ipjax.options.element).one('mouseleave',function(){
		  $(this).removeClass('cached');
		});
		*/
	});
```

### 2. Manual Request

See [jQuery.ajax/#jQuery-ajax-settings](http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings)

```js
	$.ipjax({
		url: '',
		container: '#main',
		timeout: 10000, //ms
        cache:  3600*24*7, //s, 0 for disable cache
        storage: true, //false for disable localStorage
        delay: 300, //ms, 0 for disable mouse over preloading
        push: true, // true is push, false is replace, null for do nothing
        titleSuffix: '', 
        show: '', // _default/fade or Animation Function(data, callback, isCached)
        type:'GET',
        dataType: 'html',
        data:{
            ipjax: true
        }
	});
```

### 3. Advanced Custom Show Animation

Extends `$.ipjax.showFx`:

```js
$.extend($.ipjax.showFx,{
	// Codes Here
	// Example:
	/*
    animation:function(data, callback, isCached) {
      this.html(data);
      callback && callback.call(this, data, isCached);
    }
    */
});
```

Then use like this:

```js
$(document).ipjax('a','#main',{
	// Example:
	show: 'animation'
});
```

### APIs

#### $.support.ipjax

Check `ipjax` plugin

#### $.support.storage

Check `localStorage` 

## Compatibility

Use `json2.js` for JSON.parse with IE 6~8

See: [https://github.com/douglascrockford/JSON-js](https://github.com/douglascrockford/JSON-js) for details.

```html
<!--[if lte IE 8]>
	<script type="application/javascript" src="https://raw.githubusercontent.com/douglascrockford/JSON-js/master/json2.js"></script>
<![endif]-->
```

## Tests
   
Tests (in the `tests` folder) are PHP-generated HTML pages with which to check how InstantClick behaves on different browsers. That’s what I use before releasing a new version to make sure there are no obvious regressions.

To access the suite of tests, run `php -S 127.0.0.1:8000` from the project’s root directory (**not** from the `tests` folder) and head to [http://127.0.0.1:8000/tests/](http://127.0.0.1:8000/tests/).

