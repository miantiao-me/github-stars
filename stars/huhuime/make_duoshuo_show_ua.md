---
project: make_duoshuo_show_ua
stars: 7
description: |-
    使多说显示ua
url: https://github.com/huhuime/make_duoshuo_show_ua
---

#Make DUOSHUO Show UA
> 版本：0.1<br>
> 反馈：http://jibushengdan.tk/make_duoshuo_show_ua.jbsd

##简介
> 字面意思：使多说评论显示ua<br>
> 代码仅20行<br>
> 该代码依赖ua-parser解析ua，地址：https://github.com/faisalman/ua-parser-js

##使用
> 见test.html<br>
> 如自定义显示颜色css请加.this_ua.platform.相关名称（注意大小写）

##建议
> 如果不知道将以下代码放在何处你可以考虑放在文章节点末尾

		<script type="text/javascript">
		if (typeof DUOSHUO !== 'undefined')hookDUOSHUO_tp();
		else $('[src="http://static.duoshuo.com/embed.js"]')[0].onload=hookDUOSHUO_tp;
		function hookDUOSHUO_tp(){
			var _D_post=DUOSHUO.templates.post
			DUOSHUO.templates.post=function (e,t){
				var rs=_D_post(e,t);
				var agent=e.post.agent;
				if(agent&&/^Mozilla/.test(agent))rs=rs.replace(/<\/div><p>/,show_ua(agent)+'</div><p>');
				return rs;
			}
		}
		function show_ua(string){
			console.log(string)
			$.ua.set(string);
			var sua=$.ua;
			if(sua.os.version=='x86_64')sua.os.version='x64';
			return '<span class="this_ua platform '+sua.os.name+'">'+sua.os.name+' '+sua.os.version+'</span><span class="this_ua browser '+sua.browser.name+'">'+sua.browser.name+'|'+sua.browser.version+'</span>';
		}
		</script>

###无刷新加载的请使用下面代码
		<script type="text/javascript">
		if (typeof DUOSHUO !== 'undefined')hookDUOSHUO_tp();
		else $('[src="http://static.duoshuo.com/embed.js"]')[0].onload=hookDUOSHUO_tp;
		var hookDUOSHUO_bl=false;
		function hookDUOSHUO_tp(){
			if(hookDUOSHUO_bl)return;
			else hookDUOSHUO_bl=true;
			var _D_post=DUOSHUO.templates.post;
			DUOSHUO.templates.post=function (e,t){
				var rs=_D_post(e,t);
			var agent=e.post.agent;
				if(agent&&/^Mozilla/.test(agent))rs=rs.replace(/<\/div><p>/,show_ua(agent)+'</div><p>');
				return rs;
			}
		}
		function show_ua(string){
			console.log(string)
			$.ua.set(string);
			var sua=$.ua;
			if(sua.os.version=='x86_64')sua.os.version='x64';
			return '<span class="this_ua platform '+sua.os.name+'">'+sua.os.name+' '+sua.os.version+'</span><span class="this_ua browser '+sua.browser.name+'">'+sua.browser.name+'|'+sua.browser.version+'</span>';
		}
		</script>

