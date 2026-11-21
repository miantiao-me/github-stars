---
project: twei
stars: 78
description: |-
    微博命令行工具
url: https://github.com/justan/twei
---

twei
====

twei 是用 [node.js][0] 编写的微博命令行工具. 目前支持新浪微博的查看与发送.

## 环境

twei 适用于所有可运行 node.js 的环境, 包括 _windows, linux, mac os, cygwin_ 等.

## 安装

  1. 安装 [node.js][1]
  2. 在命令行中: `npm install -g twei`
  3. `twei --version`
  
使用最新的开发版本: 

  1. `git clone https://github.com/justan/twei.git`
  2. `cd twei && npm link`
  3. `twei --version`
  
## 使用

```
  符号说明: 
    微博用户名: {{username}}
    微博 id: {{sid}}
    微博评论 id: {{cid}}
    评论内容: {{comment}}
    微博内容: {{status}}
``` 
  
  - 查看提醒: `twei remind`
  - 更新微博
  
    - 发微博: `twei update 雨一直下个不停`
    - 发带网络图片的微博: `twei update 雨一直下个不停 -i http://example/example.png`
    - 发带本地图片的微博: `twei update 雨一直下个不停 -i ./example.png`
    - 转发微博: `twei repost {{sid}} {{status}}`
    - 转发并评论: `twei rt {{sid}} {{status}}`
    
  - timeline
  
    - 查看收到的微博: `twei timeline`
    - 查看自己的微博: `twei timeline.user`
    - 查看指定用户的微博: `twei timeline.user {{username}}`
    - 查看@你的微博: `twei timeline.mentions`
    
  - 查看用户信息: `twei user {{username}}`
  - 查看指定用户的粉丝: `twei followers {{username}}`
  - 查看 follow 哪些人: `twei friends {{username}}`
  - follow 某人: `twei follow {{username}}`
  - 评论
  
    - 查看@你的评论: `twei comments.mentions`
    - 查看你发出评论: `twei comments.by_me`
    - 查看给你的评论: `twei comments.to_me`
    - 查看某条微博的评论: `twei comments {{sid}}`
    - 评论微博: `twei comment {{sid}} {{comment}}`
    - 删除评论: `twei comment.remove {{sid}}`
    - 回复评论: `twei comment.reply {{sid}} {{cid}} {{comment}}`
  
  - 帮助
    
    - 查看 `execute` 的帮助内容: `twei help execute` or `twei execute -h`
    - 查看新浪微博 api 文档:
      
      - `twei help remind`
      - `twei help timeline`
      - `twei help whois`
      
### 进阶使用

  通过管道 twei 可以方便的借用 *nix 其他字符处理程序(诸如: grep xargs cut 等)的强大功能. 如: 
  
  - 用 less 查看微博列表: `twei timeline --count 100 | less -R`
  - 查看未读微博: `twei remind --filter status | xargs twei timeline --count`
  - unfollow 你关注列表中没有 follow 你的人: 
    `twei friends {{username}} --filter users.follow_me users.name | grep false |
     cut -f 2 | xargs -i twei unfollow {}`
    
  如果你知道有意思的用法, 请告诉我 :)


## 测试

  `npm test`
  
## access_token

  由于新浪的 [api 限制][2], 目前的 `access_token` 只有数天的有效期. `Access_token` 过期后需要
  输入你[重新授权][6]后的新 `access_token`. 
  
  `access_token`保存在`$HOME/.tweirc`:
  
  ```
  [tsina]
  2 access_token = 2.00V_123567abcdefg
  ```
  
  由`twei`发布的微博会显示`来自twei`，如果你希望将`twei`改成你在新浪微博申请的应用的名称，只需
  用你的应用的`access_token`替换即可。你可以在[微博API测试后台](http://open.weibo.com/tools/console)
  看到`access_token`。
  
  

## 自动补全
  
  twei 从 v0.2.3 版本后开始支持 bash 和 zsh 的自动补全功能. 该功能默认未开启. 使用方法同 [npm][10] : `twei completion >> ~/.bashrc` or `twei completion >> ~/.zshrc`
  
    
## execute

  相比上面的示例, twei 提供了功能更为完整的微博命令行接口 execute. 使用 execute 命令可以执行较为完整的微博 api 接口.
  
  Usage: `twei execute {{apistr}} {{querystring}}`
  
### apistr & querystring:

  twei 将[新浪微博的接口][4] 转接成 group.name 的 apistr 形式. 使用 [twei api][5], 在命令行中即可直接操作微博的接口.
  
  querystring 是 apistr 的请求参数. querystring 可以是普通的请求字符串格式(uid=1488292340), 如果该条 api 定义了expect, querysting 可以省去请求参数头部分(前例中的 "uid=" 部分). 完整的 querysting 请参考新浪微博的[接口][4]
  
  Usage: `twei timeline.home count=2 page=2` or `twei timeline.home "count=2&page=2"` or `twei timeline --count 2 --page 2`, 
         `twei execute statuses.user sheepmaker count=5 page=2 feature=1` 

         
## 自定义

  alias 和 shower 是 twei 提供的自定义命令和样式功能. 
  
  - [command alias][7] 可以将常用命令改写成较短的命令. 
  - 默认的 twei 只提供了有限类型的数据. 通过 shower 则可以自定义内容的显示样式. 自定义的 shower 可以通过 `--shower` 指定使用.
    Example: `twei timeline --shower json`

## 联系

  如果你对 twei 有任何的建议, 可以使用 [issue][8], 或者直接联系 [@sheepmaker][9]
  
    

[0]: http://nodejs.org/
[1]: http://nodejs.org/#download
[2]: http://open.weibo.com/wiki/Oauth2#.E8.BF.87.E6.9C.9F.E6.97.B6.E9.97.B4
[4]: http://open.weibo.com/wiki/API%E6%96%87%E6%A1%A3_V2
[5]: https://github.com/justan/twei/blob/master/lib/api/tsina.js
[6]: https://api.weibo.com/oauth2/authorize?client_id=3811884266&redirect_uri=http%3A%2F%2Fprojects.whosemind.net%2Ftwei%2Ftsina_access_token.html&response_type=token
[7]: https://github.com/justan/twei/blob/master/lib/user_alias/alias.example.js
[8]: https://github.com/justan/twei/issues/new
[9]: http://weibo.com/urmaker
[10]: https://npmjs.org/doc/completion.html

