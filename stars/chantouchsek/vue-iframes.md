---
project: vue-iframes
stars: 49
description: |-
    A Vue js component for creating super fast loading, non-blocking iframes.
url: https://github.com/chantouchsek/vue-iframes
---

# vue-iframes
> Vue.js component for creating dynamic async iframes based on Aaron Peter's article: http://www.aaronpeters.nl/blog/iframe-loading-techniques-performance?%3E#dynamic

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-iframes.svg?style=flat-square)](https://npmjs.com/package/vue-iframes)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue-iframes.svg?style=flat-square)](https://npmjs.com/package/vue-iframes)
[![npm](https://img.shields.io/npm/dm/vue-iframes.svg?style=flat-square)](https://npmjs.com/package/vue-iframes)

## Requirements
* [Vue.js](http://vuejs.org/) (^v2.1.4)

## Vue Support

Supports on Vue >= 2 & <3

## Installation and Usage

```npm
npm install vue-iframes
```

```yarn
yarn add vue-iframes
```

```javascript
import Vue from 'vue'
import VueIframe from 'vue-iframes'

Vue.use(VueIframe)
```

## Nuxt Support
---
- Create `~/plugins/vue-iframes.js`

```js
import Vue from 'vue'
import VueIframe from 'vue-iframes'

Vue.use(VueIframe)
```

## Nuxt SSR
```js
import Vue from 'vue'
import VueIframe from 'vue-iframes/dist/vue-iframes.ssr'

Vue.use(VueIframe)
```

# nuxt.config.js

```js
plugins: [
    // ...
    { src: '~/plugins/vue-iframes' },
    // ...
]
```

```js
plugins: [
    // ...
    { src: '~/plugins/vue-iframes', mode: 'client' },
    // ...
]
```

Or another short way

```js
export default {
    // ...
    modules: ['vue-iframes/nuxt']
    // ...
}
```

## Components

```vue

<template>
  <vue-iframe
      :src="src"
      allow="camera *; geolocation *; microphone *; autoplay *"
      frame-id="my-ifram"
      @load="onLoad"
      name="my-frame"
      width="150px"
      height="200px"></vue-iframe>
</template>

<script>
  export default {
    name: 'MyIframe',
    data: () => ({
      myIframe: null
    }),
    methods: {
      onLoad(frame) {
        this.myIframe = frame.contentWindow
      }
    }
  }
</script>
```

## Props

| Prop            | Description             | Required | Default                                             |
|-----------------|-------------------------|----------|-----------------------------------------------------|
| **src**         | The iframe resource     | true     |                                                     |
| **crossorigin** | Cross origin            | false    | anonymous                                           |
| **target**      | Target of iframe        | false    | _parent                                             |
| **className**   | Iframe's class          | false    | null                                                |
| **allow**       | Iframe's allow          | false    | 'camera *; geolocation *; microphone *; autoplay *' |
| **name**        | Iframe's name           | false    | 'vue-iframes'                                       |
| **frame-id**    | Iframe's id             | false    | 'vue-iframes'                                       |
| **scrolling**   | Set scrolling to iframe | false    | null                                                |
| **width**       | Set width to iframe     | false    | null                                                |
| **height**      | Set height to iframe    | false    | null                                                |

## Events

| Name            | Description               |
|-----------------|---------------------------|
| **iframe-load** | When the iframe is loaded |
| **load**        | When the iframe is ready  |

### Contributing

Pull requests are welcome, or open up an issue if you have ideas for additional functionality, new features or bugs.

# Contact

Twitter [@DevidCs83](https://twitter.com/DevidCs83)

