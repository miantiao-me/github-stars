---
project: Rocket-Form
stars: 56
description: |-
    A universal form module.
url: https://github.com/chrishumboldt/Rocket-Form
---

# NO LONGER SUPPORTED

# Rocket Form
A universal form module.

* [Getting Started](#getting-started)
* [Basic Example](#basic-example)
* [Initialisation](#initialisation)
   * [Options](#options)
   * [Defaults](#defaults)
* [HTML Examples](#html-examples)
   * [Basic Inputs](#basic-inputs)
   * [Text Area](#text-area)
   * [Checkboxes](#checkboxes)
   * [Toggler](#toggler)
   * [Radio Buttons](#radio-buttons)
   * [Select Element](#select-element)
* [Rebuilding Files](#rebuilding-files)
* [Formplate Deprecated](#formplate-deprecated)

## Getting Started
Install via NPM.

```
npm install rocket-form
```

**NOTE** that this module has a dependency [Rocket Tools (28kb)](https://github.com/chrishumboldt/Rocket-Tools) which will automatically be installed as well.

Start by including the necessary files.

```html
<head>
   <link href="node_modules/rocket-form/css/form.min.css" rel="stylesheet" type="text/css">
</head>
<body>
   <!-- Your content goes here -->
   <script src="node_modules/rocket-tools/js/tools.min.js"></script>
   <script src="node_modules/rocket-form/js/form.min.js"></script>
</body>
```

## Basic Example
You will need to wrap your form elements with an identifier of your choice. Below is an example of executing the module complete with required HTML and Javascript.

```html
<div class="mod-form">
   <label for="input-example">Example Label<label>
   <input id="input-example" type="text">
</div>

<script>
Rocket.form();
</script>
```

## Initialisation
Each initialisation will bind to new form targets but will overlook existing ones. However existing form targets will have its state updated.

#### Options
See the different options you have available on initialisation.

Name | Default | Options | Description
---- | ---- | ---- | ----
`target` | `.mod-form` | | Set the HTML target.
`colour` | `blue` | `grey` `black` `white` `aqua` `blue` `green` `orange` `pink` `purple` `red` `grey-blue` | Set the colour of the form elements.
`label` | `normal` | `normal` `shift` | Set an animation on the form label.
`style` | `line` | `flat` `line` `raised` | Set the style of the form elements.

```javascript
Rocket.form({
   target: '.form-element',
   colour: 'red',
   label: 'shift',
   style: 'raised'
});
```

#### Defaults
You can also overwrite the module options globally by altering the Rocket defaults. To do so reference the defaults object property, for example:

```javascript
Rocket.defaults.form.target = '.new-form-class';
Rocket.defaults.form.colour = 'green';
```

## HTML Examples
There are a variety of unique form elements with each being viable targets.  See an example of each below:

#### Basic Inputs
```html
<!-- Regular input (applies to text, email, search etc...) -->
<div class="mod-form">
   <label for="text-1">Text Field</label>
   <input id="text-1" type="text">
</div>

<!-- Password input -->
<div class="mod-form">
   <label for="password-1">Password Field</label>
   <input id="password-1" type="password">
</div>

<!-- With icon -->
<div class="mod-form">
   <label for="text-2">Text Field</label>
   <div class="mod-form-icon">
      <i class="fa fa-cog"></i>
      <input id="text-2" type="text">
   </div>
</div>
```

#### Text Area
```html
<div class="mod-form">
   <label for="textarea-1">Text Area</label>
   <textarea id="textarea-1"></textarea>
</div>
```

#### Checkboxes
In this example the only difference to basic inputs is the oder of the elements and the type. Although it is not 100% necessary to change the order, it is good practice.

```html
<div class="mod-form">
   <input id="check-1" type="checkbox">
   <label for="check-1">Checkbox 1</label>
</div>

<!-- Checked example -->
<div class="mod-form">
   <input id="check-2" type="checkbox" checked="checked">
   <label for="check-2">Checkbox 2</label>
</div>
```

#### Toggler
A toggler is a special modifier made to a checkbox. It just looks cool.

```html
<div class="mod-form">
   <input type="checkbox" class="_mod-make-toggler">
</div>
```

#### Radio Buttons
Radio buttons have the same element order as checkboxes.

```html
<div class="mod-form">
   <input id="radio-1" type="radio" name="radio-option" checked="checked">
   <label for="radio-1">Radio Option</label>
</div>

<div class="mod-form">
   <input id="radio-2" type="radio" name="radio-option">
   <label for="radio-2">Radio Option</label>
</div>

<div class="mod-form">
   <input id="radio-3" type="radio" name="radio-option">
   <label for="radio-3">Radio Option</label>
</div>
```

#### Select Element

```html
<div class="mod-form">
   <select>
      <option>Select Option 1</option>
      <option>Select Option 2</option>
      <option>Select Option 3</option>
   </select>
</div>
```

## Rebuilding Files
In order to rebuild production files you will first need to install the [Rocket Command Line Tool](https://github.com/chrishumboldt/Rocket-Command). To do so run the following npm command in your terminal. **NOTE** that this package is installed globally and can take a while as it has quite a few dependencies.

```
npm install rocket-command -g
```

Once installed navigate to the Rocket Form root and run the following command:

```
rocket build
```

The relevant minified CSS and JS will now be rebuilt.

## Formplate Deprecated
The original library, Formplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Formplate will be maintained only with bug fixes under the **formplate** branch.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2018 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

