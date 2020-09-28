---
title: 微信小程序wx.request方法后台服务端无法获取传递数据
date: 2017-07-08 16:10:48
tags:
	- 小程序
	- bug
categories: 技术博客
---
在微信小程序中向服务器发起请求传递数据时候，使用的是wx.request接口，接口的主要参数有：  
- **url**：开发者服务器接口地址  
- **data**：请求的参数  
- **header**：设置请求的 header , header 中不能设置 Referer  
- **method**：默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
- **dataType**：默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse  
- **success**：收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}  
<!-- more -->

老夫在实际使用的时候，用的如下代码：  

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

小程序端request成功，服务端是php脚本，并且服务端可以通过ajaxReturn方法成功返回数据，但data中的数据服务端始终获取不到。仔细看开发文档后发现，method参数默认是GET，而后台取的是POST的数据，当然取不到。修改代码：  

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
  method:'POST',
  success: function(res) {
    console.log(res.data)
  }
})  
{% endcodeblock %}  

修改后发现，还是不行，不管是取POST还是REQUEST中的数据，均为空。再次打开[官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html#wxrequestobject)查看，发现一段文字：  

> data 数据说明 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
> 
> 
- 对于 header['content-type'] 为 'application/json' 的数据，会对数据进行 JSON 序列化
> 
- 对于 header['content-type'] 为 'application/x-www-form-urlencoded' 的数据，会将数据转换成 query string

而content-type属性默认为 `application/json`。虽然我不懂这是什么屌意思，但是我把 `application/json` 改为 `application/x-www-form-urlencoded` 之后，就可以成功获取小程序传递过来的数据啦~修改后的代码：  

{% codeblock lang:javascript %}
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
     x: '' ,
     y: ''
  },
  header: {
      'content-type': 'application/x-www-form-urlencoded'
  },
  method:'POST',
  success: function(res) {
    console.log(res.data)
  }
})  
{% endcodeblock %}  

一经修改，立马奏效~  

老夫告辞！