---
title: 微信小程序开发setData笔记“
date: 2017-07-08 14:31:40
tags:
	- 小程序
	- bug
categories: 技术博客
---
最近加入了新的公司，目前业务是做一款小程序出来。对老夫来说可谓是从零开始，不过还好，老夫天赋极高，花了半天看了下微信小程序的[官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html)，下载了官方的[开发工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，就是他娘的干！
<!-- more -->  
这里废话不多讲，基础知识看微信小程序的官方文档就可以了，这里我要讲的是使用setData函数的时候遇到的一个坑。  
> 
> Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。  
  
在注册好程序后，我们需要注册各个页面，也就是Page，Page有个属性是data，类型为Object，是页面数据存储或初始数据存储的地方。（Page实际是一个对象数组，data是其一个子集，它可以有任意个不同名字的子集，在页面函数中用 ` this ` 可以访问）  

初始化数据（data）将作为页面的第一次渲染。data 将会以 JSON 的形式由逻辑层传至渲染层，所以其数据必须是可以转成 JSON 的格式：字符串，数字，布尔值，对象，数组。  

渲染层可以通过 WXML 对数据进行绑定。  

**示例代码：**  

{% codeblock lang:html %}
<view>{{text}}</view>
<view>{{array[0].msg}}</view>
{% endcodeblock %}  

{% codeblock lang:javascript %}
Page({
  data: {
    text: 'init data',
    array: [{msg: '1'}, {msg: '2'}]
  }
})
{% endcodeblock %}  

那么作为初始数据，就肯定是写死的，如果我需要改变初始数据或者从服务器取得数据如何重新载入到页面中呢？这个时候就用到了Page.prototype.setData()函数。`setData` 函数用于将数据从逻辑层发送到视图层，同时改变对应的 `this.data` 的值。  

setData() 参数格式：接受一个对象，以 key，value 的形式表示将 this.data 中的 key 对应的值改变成 value。其中 key 可以非常灵活，以数据路径的形式给出，如 array[2].message，a.b.c.d，并且不需要在 this.data 中预先定义。

**注意：**  
1. 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
2. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。


----------
好了，上面恶补了一下基础知识，我遇到的问题是这样的，当在开发工具创建完成小程序后，会给一段示例代码，可以根据示例代码继续开发。  

**app.js实例代码如下：**  

{% codeblock lang:javascript %}
//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
{% endcodeblock %}  

仔细看官方文档不难识别出，这段代码是调用getUserInfo接口，登录用户获取用户信息并返回到data中。  

由于需要，我在接口的success的方法中添加了request方法与服务器进行了一次Post请求，请求成功后打算把服务器返回的数据重写到data中，使用的就是setData方法，却他妈，怎么也写不进去，用的是官方的示例代码。  

{% codeblock lang:javascript %}
changeNum: function() {
    this.data.num = 1
    this.setData({
      num: this.data.num
    })
  },
{% endcodeblock %}  

我他妈头都大了，试了一遍又一遍，单独测试，没毛病啊，为什么写到这个函数里面就set不进去Data呢？我又仔细读了一遍示例程序，注意到了app.js实例代码中有一句  

{% codeblock lang:javascript %}
var that = this
{% endcodeblock %}  

这代表什么意思呢？this代表的是当前对象，var that=this就是将当前的this对象复制一份到that变量中，this对象在程序中随时会改变，而var that=this之后，that没改变之前仍然是指向当时的this，这样就不会出现找不到原来的对象。

所以在这段程序里，正确使用setData函数应该是：  

{% codeblock lang:javascript %}
that.setData({
  num: this.data.num
})
{% endcodeblock %}  

将this改为that之后，瞬间奏效~  

老奴告退！