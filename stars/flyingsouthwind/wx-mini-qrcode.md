---
project: wx-mini-qrcode
stars: 49
description: |-
    微信小程序二维码组件
url: https://github.com/flyingsouthwind/wx-mini-qrcode
---

微信小程序专用的二维码组件，支持base64输出和canvas绘制两种方式。

## 使用

```
const qrcode = require('wx-mini-qrcode/src/index');

Page({
    data: {
        qrcode0: ''
    },
    onReady(){
        let text = 'https://m.baidu.com';

        // 输出base64格式
        let qrcode0 = qrcode.outputQRCodeBase64(text, {
            size: 400,
            color: '#CC6600',
            padding: 16,
            background: '#FFCC99'
        });

        this.setData({
            qrcode0
        })

        // canvas内绘制模式一
        qrcode.drawQRCodeToCanvas(text, {
            ctx: 'qrcode1',
            size: 200,
            color: '#CC6600',
            padding: 16,
            background: '#FFCC99'
        });

        // canvas内绘制模式二
        let qrcode2 = wx.createCanvasContext('qrcode2');
        qrcode.drawQRCodeToCanvas(text, {
            ctx: qrcode2,
            size: 200,
            color: '#CC6600',
            padding: 16,
            background: '#FFCC99'
        });
        qrcode2.draw();
    }
});
```

## API

#### 1. outputQRCodeBase64: function (text,  options)

###### 描述

以base64图片格式输出二维码

###### 参数

- text：必须，二维码内容，比如url

- options：参数对象

  ```
  {
  	ecc: 'H',               // 可选，容错级别，可选值L、M、Q和H（默认）
  	size: 256,              // 可选，二维码尺寸，必须为整数。默认为256
  	padding: 0,             // 可选，单侧空白边宽度，默认为0
  	color: '#000000',       // 可选，二维码颜色，必须是16进制，默认为'#000000'
  	background: '#ffffff'   // 可选，二维码背景色，必须是16进制，默认为'#ffffff'	
  }
  ```

###### 返回值

二维码图片的base64数据

#### 2. drawQRCodeToCanvas: function (text,  options)

###### 描述

绘制二维码到canvas

###### 参数

- text：必须，二维码内容，比如url

- options：参数对象

  ```
  {
  	x: 0,                   // 可选，二维码左上角点横坐标
  	y: 0,                   // 可选，二维码左上角点纵坐标
  	ctx: null,              // 必须，canvas绘制上下文或者canvasID
  	ecc: 'H',               // 可选，容错级别，可选值L、M、Q和H（默认）
  	size: 200,              // 可选，二维码尺寸，必须为整数。默认为200
  	padding: 0,             // 可选，单侧空白边宽度，默认为0
  	color: '#000000',       // 可选，二维码颜色，必须是16进制，默认为'#000000'
  	background: '#ffffff'   // 可选，二维码背景色，必须是16进制，默认为'#ffffff'	
  }
  ```

###### 返回值

无返回值

