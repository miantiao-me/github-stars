---
project: upload
stars: 82
description: |-
    iframe and html5 file uploader
url: https://github.com/aralejs/upload
---

# Upload

---------------

[![spm package](http://spmjs.io/badge/arale-upload)](http://spmjs.io/package/arale-upload)

iframe and html5 uploader.

<span style="font-size:120px;line-height:0.4;color:rgb(255, 140, 42);font-family:Menlo;">⇪</span>

## 演示

查看演示，你需要 clone 一份代码：

```
$ git clone git://github.com/aralejs/upload
$ cd upload
$ npm install
$ spm install
$ node server.js
```

然后访问：http://localhost:8000/demo.html


## Attributes

```javascript
var uploader = new Uploader({
    trigger: '#upload-icon',
    name: 'image',
    action: '/upload',
    accept: 'image/*',
    data: {'xsrf': 'hash'},
    multiple: true,
    error: function(file) {
        alert(file);
    },
    success: function(response) {
        alert(response);
    },
    progress: function(event, position, total, percent, files) {
        console.log(percent);
    }
});
```

### trigger `element|selector`

trigger 唤出文件选择器，可以是：

    - 选择器
    - element
    - jQuery Object

### name `string`

name 即为 `<input name="{{name}}">` 的值，即上传文件时对应的 name。

### action `url`

action 为 `<form action="{{action}}">` 的值，表单提交的地址。

### accept `string`

支持的文件类型，比如 `image/\*` 为只上传图片类的文件。可选项。

### multiple `boolean`

是否支持多文件上传。默认为 false。

### data `object`

随表单一起要提交的数据。

### error `function`

上传失败的回调函数。

### success `function`

上传成功的回调函数。

### progress `function`

上传的进度回调，不支持 IE9-。回调的参数分别为 ajaxEvent, 当前上传字节，总字节，进度百分比和当前文件列表。


## Methods

链式调用:

```javascript
var uploader = new Uploader({
    trigger: '#upload-icon',
    name: 'image',
    action: '/upload',
    data: {'xsrf': 'hash'}
}).success(function(response) {
    alert(response);
}).error(function(file) {
    alert(file);
});
```

## Data API

```html
<a id="upload" data-name="image" data-action="/upload" data-data="a=a&b=b">Upload</a>
<script>
var uploader = new Uploader({'trigger': '#upload'});
// more friendly way
// var uploader = new Uploader('#upload');
uploader.success(function(response) {
    alert(response);
});
</script>
```

## Advanced

Demo in **API** section could not be controlled. When you select a file, it will
be submitted immediately. We can broke the chain with ``change``:

```javascript
var uploader = new Uploader({
    trigger: '#upload-icon',
    name: 'image',
    action: '/upload',
    data: {'xsrf': 'hash'}
}).change(function(files) {
    for (var i=0; i<files.length; i++) {
        console.log('you are selecting ' + files[i].name + ' Size: ' + files[i].size);
    }
    // Default behavior of change is
    // this.submit();
}).success(function(response) {
    alert(response);
});
```

Now you should handle it yourself:

```javascript
$('#submit').click(function() {
    uploader.submit();
});
```

## Show Progress

It is impossible to show progress, but you can make a fake prgress.


```javascript
var uploader = new Uploader({
    trigger: '#upload-icon',
    name: 'image',
    action: '/upload',
    data: {'xsrf': 'hash'},
    progress: function(e, position, total, percent, files) {
      $('#progress').text('Uploading ... ' + percent + '%');
    }
}).change(function(files) {
    // before submit
    $('#progress').text('Uploading ...');
    this.submit();
}).success(function(response) {
    $('#progress').text('Success');
    alert(response);
});
```


## Seajs Hint

Load uploader with seajs:

```javascript
seajs.use('upload', function(Uploader) {
    var uploader = new Uploader({
    });
});
```

## Changelog

**2013-12-10** `1.1.0`

1. Add upload progress for html5 uploader
2. change function argument change to a files list.
3. fix multiple attribute.
4. fix this in change function
5. fix FileList object in ie 9-

**2013-07-18** `1.0.1`

1. Support choosing the same file for uploader
2. Fix memory leaks for FormData

**2013-06-25** `1.0.0`

Combine iframe and html5 uploader.

## IE hint

https://github.com/blueimp/jQuery-File-Upload/issues/1795

