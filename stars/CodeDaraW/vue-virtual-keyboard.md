---
project: vue-virtual-keyboard
stars: 63
description: |-
    ⌨️ Vue Virtual Keyboard
url: https://github.com/CodeDaraW/vue-virtual-keyboard
---

# Vue Virtual Keyboard | [English Doc](/README_en-US.md)
一个基于`Vue.js`的虚拟键盘组件。  

[![Build Status](https://travis-ci.org/CodeDaraW/vue-virtual-keyboard.svg?branch=master)](https://travis-ci.org/CodeDaraW/vue-virtual-keyboard) [![codecov](https://codecov.io/gh/CodeDaraW/vue-virtual-keyboard/branch/master/graph/badge.svg)](https://codecov.io/gh/CodeDaraW/vue-virtual-keyboard)


## Demo
[在线Demo](http://vue-virtual-keyboard.daraw.cn/)

![](https://ooo.0o0.ooo/2016/08/08/57a8975f2d6b0.png
)


## 安装

```bash
npm install https://github.com/CodeDaraW/vue-virtual-keyboard.git
```

## 使用

### ES6
```Vue
<style>
    #app {
        width: 680px;
        margin: 20px auto;
        font-family: Verdana, Sans-Serif;


    }
    h1 {
        color: #42b983;
        font-weight: bold;

    }

    textarea {
        display: block;
        width: 100%;
        min-height: 100px;
        padding: 0;
        margin: 20px 0;
        font-size: 16px;
    }
</style>
<template>
    <div id="app">
        <h1>Just Enter Text:</h3>
        <textarea type="text" v-model="keyboardText"></textarea>
        <keyboard :keyboard-text.sync="keyboardText"></keyboard>
    </div>
</template>

<script>
import Keyboard from 'vue-virtual-keyboard/src/components/Keyboard'

export default {
    data() {
        return {
            keyboardText: ""
        }
    },

    components: {
        Keyboard
    }
}
</script>
```

### CommonJS

```JavsScript
var Keyboard = require('vue-virtual-keyboard/src/components/Keyboard');
```

## 构建

``` bash
# 安装依赖
npm install

# 在 localhost:8080 启动本地服务器并支持热更新
npm run dev

# 构建
npm run build

# 单元测试
npm run unit

# e2e测试
npm run e2e

# 进行所有测试
npm test
```

## 协议
[The MIT License](http://opensource.org/licenses/MIT)

