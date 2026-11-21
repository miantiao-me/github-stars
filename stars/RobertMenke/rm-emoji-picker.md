---
project: rm-emoji-picker
stars: 78
description: |-
    A modern, ES2015 emoji picker and editor.
url: https://github.com/RobertMenke/rm-emoji-picker
---

# Why This Emoji Picker?

I wanted a modern looking emoji picker that worked on all modern browsers (IE 9+), gave me the flexibility to control what happens when an emoji is clicked, came with support for contenteditable elements, and didn't deal with the horrible :colon: syntax we've forced on users that just want to see a smiley face!

![alt tag](https://raw.githubusercontent.com/RobertMenke/rm-emoji-picker/master/examples/rm-emoji-picker.png)

# Installation

The best way to install the library is through npm:

```bash
npm install rm-emoji-picker
```

or

```bash
yarn add rm-emoji-picker
```

https://www.npmjs.com/package/rm-emoji-picker

# Usage

Include the css file located at `dist/emojipicker.css` in your html:

```html
<link href="emojipicker.css" rel="stylesheet" type="text/css" />
```

Next, import and instantiate the emoji picker, which is a UMD module (thanks webpack!).
```javascript
import EmojiPicker from "rm-emoji-picker";

//First construct an instance of EmojiPicker
const picker = new EmojiPicker();

//Next tell it where to listen for a click, the container it should be appended to, and the input/textarea/contenteditable it needs to work with
const icon      = document.getElementById('my-icon');
const container = document.getElementById('container');
const editable  = document.getElementById('my-input');

picker.listenOn(icon, container, editable);
```

That's it!

When you want the text back with emojis in unicode format, just call this method:

```javascript
const text = picker.getText();
```

If you want to render text with emojis, call this static method (works with colon syntax or unicode):

```javascript
const emoji_text = EmojiPicker.render('lol! :laughing:')
```

If you want to support windows operating systems, which have embarrassingly poor support for emojis, you'll want to add the sheets parameter to the constructor like this:

```javascript
const picker = new EmojiPicker({
    sheets: {
        apple   : '/sheets/sheet_apple_64_indexed_128.png',
        google  : '/sheets/sheet_google_64_indexed_128.png',
        twitter : '/sheets/sheet_twitter_64_indexed_128.png',
        emojione: '/sheets/sheet_emojione_64_indexed_128.png'
    }
});
```

You can find sheets to use in the sheets folder in this repo.


As promised in my "WHY" section, you can configure it to suit your needs.

Next I'll show you how to construct an EmojiPicker with all of the bells and whistles, but don't worry, you don't NEED all of these options!

```javascript
const picker = new EmojiPicker({
    //This tells the EmojiPicker that you want to use sprite sheets for operating
    //systems that don't support emoji (sprite sheets are your fastest option).
    //I've included sprite sheets for apple, google, twitter, and emojione emojis in the repo.
    //Feel free to copy those into your web root and provide a path to the files in this option.
    sheets: {
        apple   : '/sheets/sheet_apple_64_indexed_128.png',
        google  : '/sheets/sheet_google_64_indexed_128.png',
        twitter : '/sheets/sheet_twitter_64_indexed_128.png',
        emojione: '/sheets/sheet_emojione_64_indexed_128.png'
    },
    
    //Show the colon syntax in the preview or don't. It may not make sense if you're
    //using a contenteditable element to confuse users with unfamiliar colon syntax
    show_colon_preview: true,

    //If you want your contenteditable to be a single-line input, set this to true
    prevent_new_line : false,

    //The text that will be displayed when no emoji is being hovered over.
    default_footer_message: "Please select an emoji from the list above",

    //Can be "autoplace", "vertical", "horizontal", or a function that takes a tooltip as an argument.
    //The tooltip is an instance of the class in this repo here: https://github.com/RobertMenke/Tooltip-js
    positioning: "autoplace",
    
    //When the user hovers over the top row of icons, do you want them to be shown
    //a tooltip indicating which category the icon represents?
    show_icon_tooltips : true,

    //Callback that occurs when an emoji gets selected. You get back Emoji, EmojiCategory, Node
    callback   : (emoji, category, node) => {
        if(node instanceof HTMLELement){
            node.classList.add('emoji-image')
        }
    },
    
    //This optional callback is called any time the picker is opened.
    onOpen : () => {
        //trigger some event
    },
    
    //This callback is called once the picker has fully parsed and created markup for each emoji
    //and emoji category
    onReady : (categories) => {
        //example of setting a particular category as active and then filtering its contents
        categories.setActiveCategoryByName('Activity');
        picker.active_category.filter((/**Emoji*/emoji) => emoji.matchesSearchTerm(new RegExp("soccer")));
        //some time later programmatically show all emojis
        setTimeout(() => {
            picker.active_category.showAllEmojis();
        }, 3000)
    },

    //Use sprite sheets to display image emojis rather than links to png files (faster).
    //If you want links to the png files see this repo here for examples (library I'm using):
    //https://github.com/iamcal/emoji-data
    use_sheets : true,
    
    //By default we show an magnifying glass icon in the search container, 
    // but if you're not using fontawesome you may want to include your own icon.
    search_icon : '<i class="fa fa-search" aria-hidden="true"></i>',
    
    //Sets of categories and icons that denote sections at the top of the picker.
    // The category names are not arbitrary, they map to the names of categories in data.js. 
    // By default, I'm assuming you're using FontAwesome because, well, why wouldn't you?! 
    // If you want fewer categories, or different icons this is the place to configure that.
    categories: [
        {
            title: "People",
            icon : '<i class="fa fa-smile-o" aria-hidden="true"></i>'
        },
        {
            title: "Nature",
            icon : '<i class="fa fa-leaf" aria-hidden="true"></i>'
        },
        {
            title: "Foods",
            icon : '<i class="fa fa-cutlery" aria-hidden="true"></i>'
        },
        {
            title: "Activity",
            icon : '<i class="fa fa-futbol-o" aria-hidden="true"></i>'
        },
        {
            title: "Places",
            icon : '<i class="fa fa-globe" aria-hidden="true"></i>'
        },
        {
            title: "Symbols",
            icon : '<i class="fa fa-lightbulb-o" aria-hidden="true"></i>'
        },
        {
            title: "Flags",
            icon : '<i class="fa fa-flag-checkered" aria-hidden="true"></i>'
        }
    ]
});
```

# Credit Where Credit Is Due

This library would not be possible without the help of iamcal/js-emoji https://github.com/iamcal/js-emoji and Tim Down, who provided many wonderful Range and Selection answers on stackoverflow http://stackoverflow.com/users/96100/tim-down.

# Architecture


There are 5 objects that work together to create and manage the emoji picker:

1. `EmojiPicker` - Sets up the UI, dispatches events, and works with the Tooltip API for positioning.
2. `EmojiCategory` - parses data from data.js and creates a pane with emojis and a title. Manages Emoji objects that belong to it.
3. `Emoji` - parses and makes sense of data for an individual emoji. It creates markup for the emoji display in unicode or as an image. Emoji also sends various events back up to EmojiPicker (hover,click).
4. `EmojiEditor` - keeps track of the cursor in contenteditable elements, places emoji as an image, characters, or (in the case of textareas & inputs) text emojis using :colon: syntax (like Slack https://get.slack.help/hc/en-us/articles/202931348-Emoji-and-emoticons). 
5. `Converters` - deals with the iamcal/js-emoji library to convert emojis into a form we can display to users.

# Future

1. Add frequently used category by logging emoji selections into `localStorage`.
2. Add an options inside of the picker to choose which emoji palette (apple, google, twitter, emojione) to use.
3. Add an option for skin tones.
4. Update the dataset to unicode 9 (pending OS support).
5. Update code with flow types and typescript definitions.

# Contributing

To get the project up and running locally, follow the instructions here https://github.com/RobertMenke/rm-emoji-picker/wiki/Build-Instructions.

Pull requests are welcome! The best way to get in touch with me is through a github issue.

