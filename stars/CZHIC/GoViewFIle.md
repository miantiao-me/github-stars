---
project: GoViewFIle
stars: 115
description: |-
    golang 在线预览word,excel,pdf,MarkDown,msg,eml(Online Preview Word,Excel,PPT,PDF,Image by Golang)
url: https://github.com/CZHIC/GoViewFIle
---

Go  View File
============
     在线体验地址
     http://39.97.98.75:8082/view/upload
     (不会经常更新，保留最基本的预览功能。服务器配置较低，如果出现链接超时请等待几秒刷新重试，或者换Chrome)  



目前已经完成
============
    docker部署 （不用为运行环境烦恼）

    Word、Excel、PPT转码为PDF

    PDF转码为图片

    对Word,Excel,PPT和PDF的图片式在线预览

    本地上传预览

    MarkDown文件预览

    Excel转html

    预览缓存

    定时清理缓存文件

    邮件（.eml  .msg）预览

    添加水印


# 目录介绍 (本项目用的是GoFrame框架)
```
        .
        ├── app
        │   ├── api                        控制器
        │   ├── model                      结构体定义
        |   |—— service                    业务逻辑
        ├── cache
        │   ├── convert                    转图片后的文件 
        │   ├── download                   预览文件下载目录
        │   ├── local                      本地预览上传
        │   └── pdf                        转pdf后的文件
        ├── config
        │   └── config.toml                配置文件
        ├── library                        公共方法
        ├── log                            日志
        ├── main.go
        ├── public                         
        │   ├── html                       前端资源html,css,js
        │   └── index.html                 首页
        ├── router
        │   └── router.go                  路由
        ├── template                       模板
        │   └── index.html                 本地上传页面   
```

# 项目截图
![](https://github.com/CZHIC/GoViewFIle/blob/main/document/1.png?raw=true)

![](https://github.com/CZHIC/GoViewFIle/blob/main/document/2.png?raw=true)

![](https://github.com/CZHIC/GoViewFIle/blob/main/document/3.png?raw=true)





部署编译
========

docker 部署
-----
    因为没有推送远程镜像，所以需要自己手动打包镜像
    0 ： 安装docker
    1 :  git clone https://github.com/CZHIC/GoViewFIle.git
    2 :  进入GoViewFIle 目录
    3 ： 打包镜像 docker build -t  goviewfile:v0.7 .
    4 :  查看镜像 docker images
    5 :  运行容器  docker run -d -p 8082:8082 goviewfile:v0.7


       
  

Linux版
----
    环境安装： (对照Dockerfile)
             1: yum install java -y  
             
             2：  yum  install deltarpm  -y  &&\          
                 yum install  libreoffice -y &&\
                 yum install libreoffice-headless -y &&\
                 yum install libreoffice-writer -y &&\
                 yum install ImageMagick -y  &&\
                 export DISPLAY=:0.0 
                 
             3： git clone https://github.com/CZHIC/GoViewFIle.git
             
             4： cd GoViewFIle
             
             5： COPY library/emailconverter-2.5.3-all.jar   /usr/local/emailconverter-2.5.3-all.jar
             
             6： COPY library/pdfcpu    /usr/local/pdfcpu
             7： chmod 777   /usr/local/pdfcpu
             
             8： yum -y install wget &&\
                 wget http://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.5/wkhtmltox-0.12.5-1.centos7.x86_64.rpm  &&\
                 rpm --rebuilddb && yum install -y openssl && yum install -y xorg-x11-fonts-75dpi &&\
                 rpm -ivh wkhtmltox-0.12.5-1.centos7.x86_64.rpm

    
    编译
        1. go build ./main.go

    运行

        1. ./main
       
# 访问
        远程预览： http://127.0.0.1:8082/view/view?url=被预览文件的url
        本地上传： http://127.0.0.1:8082/view/upload
        首页 ：    http://127.0.0.1:8082



