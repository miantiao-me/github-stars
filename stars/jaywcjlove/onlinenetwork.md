---
project: onlinenetwork
stars: 97
description: |-
    js判断是否断网了
url: https://github.com/jaywcjlove/onlinenetwork
---

# js判断是否断网了

[![GitHub issues](https://img.shields.io/github/issues/jaywcjlove/onlinenetwork.svg)](https://github.com/jaywcjlove/onlinenetwork/issues) [![GitHub forks](https://img.shields.io/github/forks/jaywcjlove/onlinenetwork.svg)](https://github.com/jaywcjlove/onlinenetwork/network) [![GitHub stars](https://img.shields.io/github/stars/jaywcjlove/onlinenetwork.svg)](https://github.com/jaywcjlove/onlinenetwork/stargazers)

此方法是通过 `online` 和 `offline` 事件来侦听是否断网，但是这个在 `IE ` 和 `Firefox` 中，并非断网了就是真的断网了。（如火狐中在选择 `菜单>>文件>>脱机工作`才会触发 `online` 和 `offline` 事件）    

总之在`IE`和`Firefox`中一般情况下不能触发这俩事件，只有在选择脱机状态下才能触发此事件。

## 下载

```
$ bower info onlinenetwork
```

## 引用 `online.js`

```html
<script type="text/javascript" src="online.js"></script>
```

## 设置轮询时间和地址
> time： 时间不设置默认2000  
> url：不设置默认所有浏览器用 `online` 和 `offline`事件  

```js
var net = onlinenetwork({
    "time":1000,
    "url":"http://*******.com/ping.php"
})
```

## 连上网络执行

```js
net.onLineHandler(function(){
    console.log("连上了！")
})
```

## 断开网络执行

```js
net.offLineHandler(function(){
    console.log("断开网络！")
})
```


