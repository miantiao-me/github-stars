---
project: social-auth-simulator
stars: 109
description: |-
    模拟登陆->授权->获取access_token，目前支持人人、新浪微博、腾讯微博
url: https://github.com/daimajia/social-auth-simulator
---

Social-Auth-Simulator
===============

###中文名：

社交网络自动化认证

###目标：

脱离浏览器，提供自动化授权和获取access_token的解决方案。

###进展：

* 豆瓣开发中...
*	支持腾讯微博（2013-05-31）
*	支持Renren（2013-05-30）
*	支持Weibo （2013-01-18）

###演示:

App想要获取某个用户的授权，得到`access_token`，而后获取用户社交网络数据

常规做法：弹出浏览器->请求网页->用户输入密码->获取access_token

来吧，让我们来自动化这一切：用户输入密码->获取token

看个人人获取token的例子：

```python

from renren import RenrenAutoAuth

api = RenrenAutoAuth('你的app Id','你的 app Key','你的app secret','你的app redirect uri','人人账号','人人密码')

print api.get_access_token()

```

如何，是否够精简?

###什么？你有些担心？！

我想你一定有些担心，你的程序语言不是python，没有关系，我还提供了php/server端认证，只要你把php文件部署在server端，不论什么语言，构造query数据发送到服务器，自动化认证和授权就交给服务器吧，最终像获取网页数据一样得到`accesss_token`的`json`数据。

并且 `http://autoauth.sinaapp.com/weibo` 长期服务，您可放心使用，使用方式，如下图：

![](http://ww4.sinaimg.cn/mw690/610dc034jw1e8tbude577j20jt0ggdhn.jpg)

###还在犹豫什么？投入使用吧！

###关于我：
我是个学生，酷爱开发，擅长Android、php、python、nodejs、web，如果您手头有适合我的实习机会，欢迎邮件联系我:  [daimajia#gmail.com](mailto:daimajia@gmail.com)

*	[西北大学](http://zh.wikipedia.org/wiki/%E8%A5%BF%E5%8C%97%E5%A4%A7%E5%AD%A6_(%E4%B8%AD%E5%9B%BD)
*	北京师范大学
*	我的站点: [Daimajia](http://www.zhan-dui.com)
*	我的微博:[代码家](http://weibo.com/daimajia)
*	Twitter:[LinHuiwen](http://twitter.com/LinHuiwen)
*	Instagram:[daimajia](http://instagram.com/daimajia)

你也可以留意[我的Android项目](https://github.com/xuanqinanhai/little-bear-dictionary)









