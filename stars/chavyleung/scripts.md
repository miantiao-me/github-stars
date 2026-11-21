---
project: scripts
stars: 5525
description: |-
    BoxJs
url: https://github.com/chavyleung/scripts
---

# Chavy Scripts

![](https://img.shields.io/badge/license-GPL-blueviolet.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/chavyleung/scripts?color=%23c694ff)
![](https://badgen.net/github/stars/chavyleung/scripts)
![](https://tokei.rs/b1/github/chavyleung/scripts?category=code)
![GitHub contributors](https://img.shields.io/github/contributors/chavyleung/scripts)

Telegram讨论组:[Chavy Scripts Group](https://t.me/chavyscripts)

---

- [Chavy Scripts](#chavy-scripts)
- [🧰BoxJs](#boxjs)
  - [简介](#简介)
  - [使用方式](#使用方式)
  - [安装链接](#安装链接)
    - [正式版](#正式版)
    - [🧪测试版](#测试版)
- [🛠️Env.js](#️envjs)
  - [调用方式](#调用方式)
  - [功能列表](#功能列表)
    - [HttpClient](#httpclient)
    - [持久化数据](#持久化数据)
  - [安装链接](#安装链接-1)
    - [正式版](#正式版-1)
- [📃LICENSE](#license)

---

# 🧰BoxJs
<image src="https://github.com/chavyleung/scripts/blob/master/BoxJS.gif" width="30%" height="55%">

## 简介
A SPA Appliction be used for scripts utils

## 使用方式
安装对应模块/插件后，浏览器访问: [boxjs.com](http://boxjs.com "BoxJs")

## 安装链接
  * Shadowrocket: [boxjs.rewrite.surge.sgmodule](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.sgmodule "BoxJs")
  * Loon: [boxjs.rewrite.loon.plugin](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.loon.plugin "BoxJs")
  * Quantumult X: [boxjs.rewrite.quanx.conf](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.quanx.conf "BoxJs")
  * Surge: [boxjs.rewrite.surge.sgmodule](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.sgmodule "BoxJs")
  * Stash: [boxjs.rewrite.stash.stoverride](https://github.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.stash.stoverride "BoxJs")

---

# 🛠️Env.js

## 调用方式
  * Env.min.js放置于嵌入式脚本底端，然后头部调用功能
    ```
    const $ = new Env("你的脚本名称");
    ```

## 功能列表
### HttpClient

  * 支持方法: get, post, put, delete, head, options, patch
    ```javascript
    let option = {
        url: "http://www.example.com/", // URL，必须
        headers: { // 请求头，可选
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Mobile/15E148 Safari/605.1.15",
            "Content-Type": "application/json; charset=utf-8"
            ""
        },
        body: `auth_key=1234567&source_lang=EN&target_lang=ZH` // 请求体，POST等方法必须，字符串或对象
    }
    let result = $.get(URL<String> or options<Object>, callback(error, response, data)) // 不支持异步
    let result = $.post(URL<String> or options<Object>, callback(error, response, data)) // 不支持异步
    ……

    let result = await $.http.get(URL<String> or options<Object>).then(callback(response))
    let result = await $.http.post(URL<String> or options<Object>).then(response => response.body)
    let result = await $.http.put(URL<String> or options<Object>).then(response => {
        $.log(JSON.stringify(response.headers));
        return response.body
    })
    ……
    ```

### 持久化数据
    ```javascript

    $.getdata(‘chavy’) // 读取持久化数据 (string格式)
    $.setdata(string, ‘chavy’) // 写入持久化数据 (string格式)
    $.getjson(‘chavy’, default_value<String, Object>) // 读取持久化数据 (object格式),当读取失败后返回默认值
    $.setjson(object, ‘chavy’) // 写入持久化数据 (object格式)

    ```

## 安装链接
### 正式版
  * 用于集成:[Env.min.js](./Env.min.js?raw=true "Env.min.js")
  * 便于阅读:[Env.js](./Env.js?raw=true "Env.js")

---
  
# 赞助
  
1. [CloudFlare](https://www.cloudflare.com/)

# 📃LICENSE
Copyright © 2019-present chavyleung. This project is [GPL](https://github.com/chavyleung/scripts/blob/master/LICENSE) licensed.

