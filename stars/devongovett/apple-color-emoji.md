---
project: apple-color-emoji
stars: 59
description: |-
    Replace emoji in strings with images from the Apple Color Emoji font
url: https://github.com/devongovett/apple-color-emoji
---

# apple-color-emoji

Extracts emoji images from the Apple Color Emoji font using [fontkit](http://github.com/devongovett/fontkit), 
and generates a regular expression that can be used to replace emoji in strings with `<img>` tags if 
the current browser or platform does not have native support.

## Installation

    npm install apple-color-emoji

## Example

```javascript
var emoji = require('apple-color-emoji');

// configure
emoji.imageDir // the directory where the images are located (on the server)
emoji.basePath // the base path or URL where images are located

// check for native support
if (emoji.nativeSupport) { /* ... */ }

// replace an emoji in a string with an <img>
// (only if there is no native support in the browser)
emoji.replace('this is an 🍎') //=> 'this is an <img class="emoji" src="/path/to/d83c-df4e.png" alt="🍎">'

// you can also get an image URL for a particular emoji character
emoji.getImage('😀') //=> "/path/to/d83d-de00.png"

// if you don't like <img> tags, you can use the regex directly
myString.replace(emoji.regex, function(char) {
  return '<span style="background-image: url(' + emoji.getImage(char) + ')"></span>';
});
```

## License

MIT

