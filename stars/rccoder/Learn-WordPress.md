---
project: Learn-WordPress
stars: 31
description: |-
    WordPress的进阶之路
url: https://github.com/rccoder/Learn-WordPress
---

《WordPress的进阶之路》
===
这是一本聚集众多人的心血产生的书，所有内容面向互联网免费开放。

发起原因
===
WordPress无论在国外还是国内一直是一个比较火的博客软件，或者说是一个CMS软件。有关WordPress的教程在网上是多之又多，于此同时也避免不了鱼龙混杂的状况，很多教程只是死板的粘贴复制，没有讲透彻他的道理，导致WordPress的使用者越来越困惑。

偶然间看到GitBook能利用Markdown免费快速的制作精美的书籍，一时间便诞生了这个想法。

希望正如大家所希望的一样，这本书能在一年之内由大家一起完成他的出版，然后免费发布在互联网上。

时间
===
2015年7月5号开始，截至日期不定（这是一本活书，而不是一本死书）

协作方式
===
通过GitHub进行协作，文章格式采用Markdown。最后托管在gitbook平台，可转化为Epub/PDF/mobi等多种格式。

参与协作的朋友只需撰写更新Markdown文件内容，我会将内容转化成页面更新到gitbook平台与github的gh-pages分支。

如何参与
===
1. fork 这个项目
* 把fork过去的项目（也就是你的GitHub下面的那个项目）克隆到本地
* 运行 ```git remote add upstream https://github.com/rccoder/Learn-WordPress```把我的仓库添加为远程仓库
* 运行 ```git remote update```进行更新
* 运行 ```git fetch upstream master```拉取我的库到本地
* 运行 ```git rebase upstream/master``` 拉取我的更新合并到你的分支
* 修改你的文件
* 运行```git add .```添加到缓冲区
* 运行```git commit -m "说明"```
* 运行```git push -u origin master```提交到你的仓库
* 登录网页，发送Pull Request


这只是一个初始化的流程，只需要做一遍就行，之后一直在你的分支进行修改,add,commit即可。

如果我的库有了更新，请重复5-11步。

**或者你可以查看这篇文章：[同步一个 fork](http://gaohaoyang.github.io/2015/04/12/Syncing-a-fork/)**

一些约定
===
* 所有文本均采用Markdown进行编辑，请在编辑的过程中使用相关的Markdown编辑器，并且在最后commit之前进行本地预览（linux推荐retext，os x推荐mou，windows推荐cmd）。
* SUMMARY.md 为在gitbook上发布时的目录页面，比较重要，建议不要对其进行大面积的修改，只进行自己编辑内容标题的添加。
* 对于转载等非原创的文章，请确定其内容的正确性并且在最后注明原文地址; 对于翻译的文章同样需注明原文地址。
* commit之前请记得及时review，确保错别字等低级错误的出现率尽可能的减小。
* 对于每一章节出现的插图，请在相应的章节下面建立统一的img文件夹进行图片的存放。命名为：**昵称_文章名数字.png**。例如：rccoder_REAME1.png。
* 每节完成后，建议使用[doctoc](https://github.com/thlorenz/doctoc)为其添加索引文件。

可贡献内容
===
* 原创精品文章以及国外文章的翻译作品或者是其他高精华的文章
 * 错别字/措辞/图文修饰 - 直接发送pull request
 * 相关建议直接进行review或者在issues提交问题
 
作者
===
……
