---
project: rapid-core
stars: 61
description: |-
    core of rapid cloud framework
url: https://github.com/Clouda-team/rapid-core
---

# Rapid-core

[![NPM version](https://badge.fury.io/js/rapid-core.svg)](http://badge.fury.io/js/rapid-core)
[![Dependency Status](https://david-dm.org/clouda-team/rapid-core.svg)](https://david-dm.org/clouda-team/rapid-core)

> RapidJS是一款基于Nodejs的、专门为灵活多变的web业务而设计的服务端开源开发框架。其目标是支撑开发者从业务搭建之初，到产品成长、成熟的整个迭代过程，RapidJS从设计之初便在系统的延展性及适用方式上做了大量考虑。

> RapidJS从核心层将整个系统抽象为「plugin」（执行资源），「configure」（配置资源），「resource」（公用资源）三类资源，并尽量使所有功能模块「可插接」、「可替换」、「可公用」， 从而使框架无论在「业务层」，「接入层」或「中间层」中都能出色工作。此外，RapidJS提供了插件机制，开发者能方便地使用和分享插件。

> 就如同大多数nodejs框架一样，RapidJS也是简洁而富有表现力的。

## What is this?
rapid将一个系统的各种资源进行划分后抽像为三类资源,即config(配置信息),resource(运行时可变资源),plugin(可运行的提供功能的内容).三类资源通过相互间的交叉引用构成整个系统的运行时架构. 所有开发过程中都需要解决的即是资源的管控. rapid-core将主要用于提供这三类资源管理及载入方案.

* rapid.plugin : 提供可执行的功能的部分被定义为插件.每个插件都将实现一种特定的能力(如包装数据源访问,提供httpServer或socketServer的包装能力等.)
* rapid.config : 系统启动前被载入的并且一般在运行时不会产生变化的配置信息被归为config
* rapid.resource : 在系统运行时产生的,整个运行过程中,会产生变化的数据被归类为resource.

其中config与resource在运行时并没有差异,只是在名称上做了区分.

## How to runing?

> 以下简单介绍了rapid-core的运行过程,同时示范如何使用rapid-core.

1. 当执行require("rapid-core")时,将自动提供名称为"rapid"的全局对像,以及define,watch,use等三个方法.
2. 检测ROOR_DIR,USER_DIR,CONF_DIR等三个全局常量是否存在,如果不存在会自动创建以下默认值.

		rapid.ROOT_DIR = GLOBAL.ROOT_DIR = path.join( process.argv[1] || __dirname, "../");
		rapid.USER_DIR = GLOBAL.USER_DIR = path.join(ROOT_DIR , "./app/");
		rapid.CONF_DIR = GLOBAL.CONF_DIR = path.join(ROOT_DIR , "./conf/");

3. 自动检测CONF_DIR是否存在,以及其下是否有可载入的.js文件,若有则进行载入,每个载入的文件应该用来定config,增加resource,注册简单的plugin等动作,可以使用以下写法.

		rapid.resource.define("appName","rapid+ App Framework");
		
		rapid.config.define("rapid-httpserver",{
			port : 8888,
			autoStart : true
		});
		
		rapid.plugin.define("sayHi",function(cb){
			cb(null,{
				say:function(namy){
						return "Hi," + name
					}
			});
		});
		
	// 或可以使用以下简略写法:
 
		define({
			"resource.appName":"rapid+ App Framework",
			"config.rapid-httpserver" : {
					port : 8888,
					autoStart : true
				},
			"plugin.sayHi":{
					say:function(namy){
						return "Hi," + name
					}
				}
			})
			
4. 对于一些相互间存在依赖的内容,可以使用watch方法添加一个监视动作.当需要监视的资源存在的时候,触发回调.进行下一步操作.以下示范了watch的使用方式
		
		// waiting resource
		rapid.resource.watch("appName",function(name){
			console.log("find appName is [%s], at time : %d" , name, Date.now());
			rapid.resource.watch("version",function(ver){
				
				console.log("find version is [%s], at time : %d" , ver, Date.now());
				
				rapid.resource.define("fullAppName",name + "@" + ver);
				rapid.plugin.define("talker",function(cb){
					cb(null,{
						say:function(){
							console.log("hi, i am [" + rapid.resource.fullAppName + "]");
						}
					})
				})
			});
		})
		
		//延迟..
		setTimeout(function(){
			console.log("set appName at %d", Date.now());
			define({
				"resource.appName" : "rapidAppFramework"
			});
			
			// 再延迟..
			setTimeout(function(){
				console.log("set version at %d", Date.now());
				define({
					"resource.version" : "0.0.1#Preview"
				});
			},1000)
			
		},1000)
		
		//直到有talker
		rapid.plugin.watch("talker",function(talk){
			console.log("find talker, at time : %d" , Date.now());
			talk.say();
		});	
		
	//同样可以使用全局的watch方法,以对以上demo进行简化
				
		watch("resource.appName","resource.version",function(name,ver){
			define({
				"resource.fullAppName" : name + "@" + ver , 
				"plugin.talker" : {
					say:function(){
						console.log("hi, i am [" + rapid.resource.fullAppName + "]");
					}
				}
			});
		});
		
		watch("plugin.talker",function(talker){
			talker.say();
		})
		
		//相同的延迟处理..
		setTimeout(function(){
			console.log("set appName at %d", Date.now());
			define({
				"resource.appName" : "rapidAppFramework"
			});
			
			// 再延迟..
			setTimeout(function(){
				console.log("set version at %d", Date.now());
				define({
					"resource.version" : "0.0.1#Preview"
				});
			},1000)
		},1000)

	// 以上两种写法最终都可以在console中得到输出结果
	
		"hi, i am [rapidAppFramework@0.0.1#Preview"
5. 基于以上的资源定义和使用的方式,可以使所有资源异步声明,因此做到对文件载入顺序和资源使用顺序的无依赖.从而做到批量从外部载入文件.
 		
 		//批量载入一个目录下的所有.conf.js结尾文件.
 		rapid.requireDir("/actions",/.*\.conf\.js/);
 		
	对于外部载入的文件,为了再次简化watch的写法, 提供另一种更为简单的use方法.为了示范无序载入,这里定义了两个外引文件. 分别为 include_1.js与include_2.js.并放在与启动文同目录下.
	

		// include_1.js
		var name = use("resource.appName");
		var ver = use("resource.version");
		
		define("resource.fullAppName",name + "@" + ver);
		
		define("plugin.talker", {
			say:function(){
				console.log("hi, i am [" + rapid.resource.fullAppName + "]");
			}
		});
		
	--------
	
		// include_2.js
		var talker = use("plugin.talker");
		talker.say();
		
	--------
		
		//启动文件
		
		//载入目录下以  include开头的js文件
		rapid.requireDir("./",/include.*\.js/);
		
		//相同的延迟注册处理..
		setTimeout(function(){
			console.log("set appName at %d", Date.now());
			define({
				"resource.appName" : "rapidAppFramework"
			});
			
			// 再延迟..
			setTimeout(function(){
				console.log("set version at %d", Date.now());
				define({
					"resource.version" : "0.0.1#Preview"
				});
			},1000)
			
		},1000);

## 使用手册		

* [Rapid-core API Document ](http://cloudaplus.duapp.com/rapid/core/api_document)
* [To learn more](http://cloudaplus.duapp.com/)


