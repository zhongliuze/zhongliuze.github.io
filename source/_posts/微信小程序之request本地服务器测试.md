---
title: 微信小程序之request本地服务器测试
date: 2017-07-08 15:16:34
tags:
	- 小程序
categories: 技术博客
---
在微信小程序里，与后台服务器交互称之为发起请求，封装接口函数是wx.request，[官方文档介绍点此](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html)。  
<!-- more -->

进行request的时候要加一系列参数，比如url、data、header、method，这些官方文档都有介绍，就不重复描述。 

**贴一段示例代码： **

{% codeblock lang:javascript %}
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
     x: '' ,
     y: ''
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    console.log(res.data)
  }
})
{% endcodeblock %}  

这时候，哪怕在测试环境下进行request请求必须遵从几个条件：  

1. 客户端的 HTTPS TLS 版本为1.2，但 Android 的部分机型还未支持 TLS 1.2，所以请确保 HTTPS 服务器的 TLS 版本支持1.2及以下版本；  
2. url 中不能有端口；  
3. request 的默认超时时间和最大超时时间都是 60s；  
4. request 的最大并发数是 5；  
5. 网络请求的 referer 是不可以设置的，格式固定为 https://servicewechat.com/{appid}/{version}/page-frame.html，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版。  

最重要的是第一点，要想进行request请求必须要在服务器配置https，配置https又需要注册各种证书，很是麻烦，难道就没有可以保证本地开发测试的方法吗？答案是有，但是官方文档上没有。  

**方法1：**  
回想一下，小程序是怎么检测到我们后台配置的地址的？从项目开始到结束，无非就是appid了，在创建项目的时候设置无appid，亲测可用。  
  
**方法2：**  
另一种方法是在编辑器中设置，勾选“开发环境不校验请求域名及TLS版本”，暂时不知道这个方法的弊端，不过能用就行，也不推荐使用该方法。  

<center>!['设置不校验'](/images/2017/07/08/001.jpg)</center>  

老夫告退！