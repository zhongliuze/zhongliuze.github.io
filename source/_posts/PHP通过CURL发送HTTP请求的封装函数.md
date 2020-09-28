---
title: PHP通过CURL发送HTTP请求的封装函数
date: 2017-07-08 16:31:22
tags:
	- php
	- http
	- curl
categories: 技术博客
---
这几天在项目中有个需求，在服务端调用接口并取得数据。实际是进行模拟http请求，通常在客户端进行请求很方便，直接ajax post就可以，在php后台，通常使用cURL方法。  
<!-- more -->
### cURL介绍 ###

cURL 是一个利用URL语法规定来传输文件和数据的工具，支持很多协议，如HTTP、FTP、TELNET等。PHP支持的由Daniel Stenberg创建的libcurl库允许你与各种的服务器使用各种类型的协议进行连接和通讯。  

libcurl支持http、https、ftp、gopher、telnet、dict、file和ldap协议。libcurl同时也支持HTTPS认证、HTTP POST、HTTP PUT、 FTP 上传(这个也能通过PHP的FTP扩展完成)、HTTP 基于表单的上传、代理、cookies和用户名+密码的认证。  

PHP中使用cURL实现Get和Post请求的方法。  

### PHP cURL函数列表 ###

{% codeblock lang:php %}
curl_close()	//关闭一个cURL会话
curl_copy_handle()	//复制一个cURL句柄和它的所有选项
curl_errno()	//返回最后一次的错误号
curl_error()	//返回一个保护当前会话最近一次错误的字符串
curl_escape()	//返回转义字符串，对给定的字符串进行URL编码
curl_exec()	//执行一个cURL会话
curl_file_create()	//创建一个CURLFile对象
curl_getinfo()	//获取一个cURL连接资源句柄的信息
curl_init()	//初始化一个cURL会话
curl_multi_add_handle()	//向curl批处理会话中添加单独的curl句柄
curl_multi_close()	//关闭一组cURL句柄
curl_multi_exec()	//运行当前cURL句柄的子连接
curl_multi_getcontent()	//如果设置了CURLOPT_RETURNTRANSFER，则返回获取的输出的文本流
curl_multi_info_read()	//获取当前解析的cURL的相关传输信息
curl_multi_init()	//返回一个新cURL批处理句柄
curl_multi_remove_handle()	//移除curl批处理句柄资源中的某个句柄资源
curl_multi_select()	//等待所有cURL批处理中的活动连接
curl_multi_setopt()	//设置一个批处理cURL传输选项
curl_multi_strerror()	//返回描述错误码的字符串文本
curl_pause()	//暂停及恢复连接
curl_reset()	//重置libcurl的会话句柄的所有选项
curl_setopt_array()	//为cURL传输会话批量设置选项
curl_setopt()	//设置一个cURL传输选项
curl_share_close()	//关闭cURL共享句柄
curl_share_init()	//初始化cURL共享句柄
curl_share_setopt()	//设置一个共享句柄的cURL传输选项
curl_strerror()	//返回错误代码的字符串描述
curl_unescape()	//解码URL编码后的字符串
curl_version()	//获取cURL版本信息
{% endcodeblock %}  

### HTTP请求函数实现 ###

看到这么多函数，到底怎么用？怎么在服务端实现HTTP请求，前几天看到有人分享关于cURL的文章，在这里我也来分享一下我正在系统里用到的一个通过cURL来发送HTTP请求的函数。  

{% codeblock lang:php %}
/**
 * 发送HTTP请求方法
 * @param  string $url    请求URL
 * @param  array  $params 请求参数
 * @param  string $method 请求方法GET/POST
 * @return array  $data   响应数据
 */
function http($url, $params, $method = 'GET', $header = array(), $multi = false){
    $opts = array(
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTPHEADER     => $header
    );
    /* 根据请求类型设置特定参数 */
    switch(strtoupper($method)){
        case 'GET':
            $opts[CURLOPT_URL] = $url . '?' . http_build_query($params);
            break;
        case 'POST':
            //判断是否传输文件
            $params = $multi ? $params : http_build_query($params);
            $opts[CURLOPT_URL] = $url;
            $opts[CURLOPT_POST] = 1;
            $opts[CURLOPT_POSTFIELDS] = $params;
            break;
        default:
            throw new Exception('不支持的请求方式！');
    }
    /* 初始化并执行curl请求 */
    $ch = curl_init();
    curl_setopt_array($ch, $opts);
    $data  = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    if($error) throw new Exception('请求发生错误：' . $error);
    return  $data;
}
{% endcodeblock %}  

调用方法：  

{% codeblock lang:php %}
//定义一个要发送的目标URL；
$url = "https://www.xxx.com";
//定义传递的参数数组；
$data['aaa']='aaaaa';
$data['bbb']='bbbb';
//定义返回值接收变量；
$httpstr = http($url, $data, 'POST', array("Content-type: text/html; charset=utf-8"));
{% endcodeblock %}  