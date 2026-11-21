---
project: forcify
stars: 88
description: |-
    Polyfill 3D/Force Touch in any device
url: https://github.com/Huxpro/forcify
---

# Forcify

> Use **Force Touch** in any device, today.

# WARNING: This project is not actively maintained.

## Intro

Forcify is a JavaScript library help you polyfill 3D/Force Touch in any device. All you need is just deal with the `e.force` value, dead simple:

```javascript
var ele = document.querySelector('#force')

new Forcify(ele).on('force', (e) => {
    doSomething(e.force)
})
```

Waaaaait! Can 3D/Force Touch, a hardware feature, be really polyfilled? No, but we can emulate it with Long Press!   
**Forcify can help you start supporting Force Touch feature to your app or site without hesitate.**   

[Check out demo in any unsupported device →](https://huxpro.github.io/forcify)

[Download Forcify.min.js (2.4kb not gzipped)](https://huxpro.github.io/forcify/dist/forcify.min.js)


## How Forcify Works?

1. Forcify use a ***Dynamic Feature Detection*** to detect whether the 3D/Force Touch is really supported: **If true**, all hack stops, forcify just wrap the difference between *OSX Force Touch* and *iOS 3D Touch*, make things easier.
2. If Forcify detect that ***Current Browser Behave Badly (not truly support but give a `!== 0` force value)***, Forcify would help you **shim these weird browser**, you would not get a wrong force value to mis-trigger your handlers.
3. Finally, Forcify ***emulate a fake force event with LONG PRESS*** in any unsupported device as the **fallback**, to keep pushing events with a growing `force` value after long press triggered, which help your shortcut actions designed for Force Touch can be used in any other device.

Also, Forcify provide many options such as `FALLBACK_TO_LONGPRESS`, `LONG_PRESS_DELAY`, `LONG_PRESS_DURATION` and `SHIM_WEIRD_BROWSER` to let you customize it as you need, more on [Document](#document).


## Why Forcify?

3D/Force Touch release new `webkitForce` (Force Touch) and `force` (3D Touch) property to mouse and touch events. But, different browsers implement them in really different and weird way, let's have a quick glance:

Desktop:

Browser | support |`force` | `webkitForce` | `events`
------- | ------- | ------ | ------------- | --------
OSX Safari | Force Touch | null  | 0 ~ 1 by Force | webkitmouseforce
OSX Safari | null        | null  | 0              | mouse
Chrome     | null        | null  | null           | mouse
Chrome Touchable-PC | null | 0   | null           | touch

Mobile:

Browser | support |`force` | `webkitForce` | `events`
------- | ------- | ------ | ------------- | --------
iPhone Safari        | 3D Touch | 0 ~ 1 by Force       | null | touch
iPhone Safari        | null | 0                        | null | touch
Chrome Mobile        | null | 1                        | 1    | touch
Chrome Mobile Nexus5 | null | **0 ~ 1 by touch area!** | same | touch
Chrome Emulator      | null | 1                        | null | touch
Android Browser      | null | null                     | null | touch



As you see, even just supporting the real OSX Force Touch and iOS 3D Touch you need write twice, and it is not that easy as you thought:

- In OSX Safari we have awesome `webkitmouseforcewillbegin` and `webkitmouseforcechange` to get value every time changed directly.
- in iOS Safari we have old `touchdown`, `touchmove`, `touchup` only. We has to use *polling* to repeat poll the `force` value during the entire touch duration.

Things gonna worse when you look at **Chrome**. Chrome on all device nowadays haven't any Force Touch support, but It provide a tricky `!== 0` force value in many platform!

- In Chrome Mobile, we got `force=1` and `webkitForce=1`, which means your "Force Actions" would be ALWAYS triggered just by a click
* In Chrome on Nexus5, *unbelievable magic happen!*, the force value is given by the area your finger touch to the screen! This bad trick really make engineer awkwardly

That is why Forcify comes to help.


## Document

> Check out `example/` to get a detailed example

### Install

The simplest way to use Forcify is adding it to your HTML page with `<script>`:

```html
<script src="https://unpkg.com/forcify/dist/forcify.min.js"></script>
```

And you can also include Forcify in your JavaScript bundle with ES6, CommonJS or AMD syntax.

```bash
$ npm install forcify --save
```

### Usage

Create a new Forcify instance, and use `on` to listen `force` event:

```javascript
var ele  = document.querySelector('#force')
var $ele = new Forcify(ele)

// add event listener
$ele.on('force', (e) => {
    doSomething(e.force)
})
```

You can pass `options` into the `Forcify` constructor to override [default options](#forcifydefaults):

```javascript
// only emit event in real supported device.
var $noFallback = new Forcify(ele, {
    FALLBACK_TO_LONGPRESS: false
})

// I am sure there would be a mess watting for u
var $noShim = new Forcify(ele, {
	SHIM_WEIRD_BROWSWR: false
})

// not easy to trigger...
var $longLongPress = new Forcify(ele, {
	LONG_PRESS_DELAY: 10000 	//ms
})
```

Also, you can use `Forcify.config` to override default options globally

```javascript
// let's make duration of the force grow slower.
Forcify.config({
	LONG_PRESS_DURATION: 500
})

```

## API


### Forcify.defaults

Default options for Forcify instance.

##### `LONG_PRESS_DELAY: 200`

- Type: `Number`
- Default `200(ms)`
- Delay to trigger fake Force Touch



##### `LONG_PRESS_DURATION: 100`

* Type: `Number`
* Default `1000(ms)`
* Duration from MIN to MAX of the fake Force Touch



##### `FALLBACK_TO_LONGPRESS: true`

* Type: `Boolean`
* Default `true`
* if Forcify fallback to long press on unsupport devices. if set false, Forcify will not fallback 'force' to 'long press'


##### `SHIM_WEIRD_BROWSER: true`

* Type: `Boolean`
* Default `true`
* Some browser, such as Chrome, provide a very weird force value.  if set false, Forcify would not try to find and ignore those weird behavior. Which means your "Force Actions" may
	- be triggered just by a click in some 'force: 1' devices.
	- be influenced in device like Nexus5 to give a force in (0,1)


### Forcify.detection

Object save the results of dynamic detection. All fields is `Boolean` type and default `false`.

##### `TOUCH3D`

Unfortunately there is not a feature detection for 3DTouch so far, so Forcify use a dynamic detection to detect it.  
If Forcify detects that force is support, all hacking stop.


##### `OSXFORCE`

OSX support real webkit force touch


##### `WEIRD_CHROME`

Chrome Mobile give any touchevent a 'force' property with value: 1.   
Forcify has to hack it.  
Forcify not detect Weird Chrome by UA but behaviors.

## Known Issues 

- When user use a old Macbook without force touch but a Magic Trackpad 2 and switch between them.

## Thanks

Special thank to:

- [This nice post about iOS9](http://www.mobilexweb.com/blog/ios9-safari-for-web-developers) inspired me to create Forcify.
- [3D Touch Demo](https://github.com/freinbichler/3d-touch) by @freinbichler, which I used in my examples.

