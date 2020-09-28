---
title: 微信小程序获取登录用户唯一标识openid
date: 2017-07-09 00:06:25
tags:
	- 小程序
	- bug
categories: 技术博客
---
在微信小程序开发中，获取当前登录用户的信息是通过调用 `wx.login` 接口，然后调用 `wx.getUserInfo(OBJECT)` 方法获取。调用成功 `success` 方法返回参数有：  

- **userInfo**：用户信息对象，不包含 `openid` 等敏感信息  
- **rawData**：不包括敏感信息的原始数据字符串，用于计算签名  
- **signature**：使用 `sha1( rawData + sessionkey )` 得到字符串，用于校验用户信息，参考文档 [signature](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)  
- **encryptedData**：包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)  
- **iv**：加密算法的初始向量，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)  
<!-- more -->

**示例代码：**  

{% codeblock lang:javascript %}
//定义一个要发送的目标URL；
$url = "https://www.xxx.com";
//定义传递的参数数组；
$data['aaa']='aaaaa';
$data['bbb']='bbbb';
//定义返回值接收变量；
$httpstr = http($url, $data, 'POST', array("Content-type: text/html; charset=utf-8"));
{% endcodeblock %}  

`encryptedData` 解密后为以下 `json` 结构，详见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)  

{% codeblock lang:javascript %}
{
    "openId": "OPENID",
    "nickName": "NICKNAME",
    "gender": GENDER,
    "city": "CITY",
    "province": "PROVINCE",
    "country": "COUNTRY",
    "avatarUrl": "AVATARURL",
    "unionId": "UNIONID",
    "watermark":
    {
        "appid":"APPID",
    "timestamp":TIMESTAMP
    }
}
{% endcodeblock %}  

> **UnionID机制说明：**  
> 
如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 `unionid` 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 `unionid` 是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，`unionid` 是相同的。  


----------  

说了这么多的意思就是通过 `wx.getUserInfo(OBJECT)` 方法获取的数据只有用户名、头像地址、性别、城市等信息，就算用 `encryptedData` 解密后，得到的也只有 `unionID` 和 `appid`，`unionID` 的机制已经说明，没什么卵用。`appid` 是开发者自己持有的，没有什么意义。  

那么到底用什么来确定用户的唯一性呢？ `openid`，如何获取呢？  

让我们回到用户登录的时候，调用的是 `wx.login(OBJECT)`接口：  

> 调用接口获取登录凭证（`code`）进而换取用户登录态信息，包括用户的唯一标识（`openid`） 及本次登录的 会话密钥（`session_key`）。用户数据的加解密通讯需要依赖会话密钥完成。  

在调用成功后，也就是用户允许登录后，回调内容会带上 `code`（有效期五分钟），开发者可以将 `code` 发送到开发者服务器后台，再次调用 `API` 接口，将 `code` 换成 `openid` 和 `session_ke`y。  

注意：`code` 换取 `session_key` 和 `openid` 的过程是调用HTTPS接口的过程，开发者服务器使用登录凭证 `code` 获取 `session_key` 和 `openid`。其中 `session_key` 是对用户数据进行加密签名的密钥。为了自身应用安全，**session_key 不应该在网络上传输**。  

也就是说用 `code` 换取 `session_key` 和 `openid` 的过程不可在微信小程序端执行，而应放在开发者的服务器端调用完成，保证其安全性。  

接口地址：  

{% codeblock lang:javascript %}
https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
{% endcodeblock %}  

请求的参数有：  

- **appid**：小程序唯一标识  
- **secret**：小程序的 app secret  
- **js_code**：登录时获取的 code  
- **grant_type**：填写为 authorization_code  

返回的参数：  

- **openid**：用户唯一标识  
- **session_key**：会话密钥  

返回说明：  

{% codeblock lang:javascript %}
//正常返回的JSON数据包
{
      "openid": "OPENID",
      "session_key": "SESSIONKEY"
}
//错误时返回JSON数据包(示例为Code无效)
{
    "errcode": 40029,
    "errmsg": "invalid code"
}
{% endcodeblock %}  


----------  

微信小程序获取用户唯一标识 `openid` 代码示例：  

{% codeblock lang:javascript %}
//调用登录接口
      wx.login({
        success: function (res_code) {
          if (res_code.code) {
            //发起网络请求
            console.log(res_code);
            wx.request({
              url: 'http://localhost/index.php?m=home&c=login&a=index',
              data: {
                res_code:res_code.code,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                console.log(res);
              }
            })

            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
{% endcodeblock %}  

服务端代码示例：  

{% codeblock lang:php %}
public function index() {
        if($_POST) {
            $js_code = I('post.res_code','','trim,string');
            $appid = C('APP_ID');
            $secret = C('APP_SECRET');
            $grant_type = C('GRANT_TYPE');
            $url = C('POST_URL_WEIXIN');
            //定义传递的参数数组；
            $data['js_code'] = $js_code;
            $data['appid'] = $appid;
            $data['secret'] = $secret;
            $data['grant_type'] = $grant_type;
            //定义返回值接收变量；
            $httpstr = D('Common')->http($url, $data, 'POST', array("Content-type: text/html; charset=utf-8"));
            $this->ajaxReturn($httpstr);
        }
    }
{% endcodeblock %}  


