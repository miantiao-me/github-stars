---
project: download4kuaipan
stars: 32
description: |-
    vps下载国外视频 并将其即时上传至金山快盘
url: https://github.com/no13bus/download4kuaipan
---

download4kuaipan

==================
写这个程序主要是最近刚买了个很便宜的vps，无聊中发现他下载youtube视频的速度特别快，能达到20M/s甚至更高。因此写了这个程序，用vps远程下载视频，然后远程监测下载文件夹的文件变化，如果发现有新增文件出现即把文件上传到金山快盘里面去。等到有空了从金山快盘下载视频或者文件，速度绝对比ssh代理下载的快。程序使用supervisor监控程序。

==================
1.使用下面的命令直接安装必要的包
pip install -r requirement.txt

2.首先你要有金山快盘的账户 然后到这个[地址](http://www.kuaipan.cn/developers)申请快盘的开发平台的应用创建应用后就能得到consumer_key consumer_ecret。然后执行python Kuaipan_OAuth.py即可在命令行的提示下最终得到oauth_token oauth_token_secret这2个值。然后将config.py里面的相关配置修改性下。
至于kuaipan_dir 和download_dir的意义，看下图
![image](https://raw.githubusercontent.com/no13bus/download4kuaipan/master/kuaipan.png)
图中的kuaipan_dir = 'testdir'
download_dir指的是vps上你设置的下载文件的路径

3.supervisor的跟本程序有关的配置如下
[program:youtube]
command=python /root/python-kuaipan/Kuaipan_File.py
directory=/root/downloadfiles/
autorestart=true
redirect_stderr=true

4.当然也可以在windows上面使用fabric远程连接vps 直接将文件下载至download_dir里面。下载之后，照样还是能将文件即刻上传金山快盘
fab dl:url="视频地址" 或者 fab wget:url="网络文件地址"

===================
### 疑问：
1.fab dl:url="url地址"
youtube的网址里面出现的=要变成\= 否则fabric无法解析 不知道为什么

2.supervisord监控应用的时候 这个应用如果有一些print输出的时候，监控里面并看不到任何输出，只是看到是否在running。不知道这个大家都是咋解决的

===================
TO-List
对百度网盘的支持
==================

用到的开源项目
* [金山快盘API](https://github.com/deren/python-kuaipan)
* [监控linux文件变化 pyinotify](https://github.com/seb-m/pyinotify)
* [supervisord](https://github.com/Supervisor/supervisor)
* [fabric部署利器](https://github.com/fabric/fabric)



