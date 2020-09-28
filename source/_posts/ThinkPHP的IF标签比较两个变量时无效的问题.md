---
title: ThinkPHP的IF标签比较两个变量时无效的问题
date: 2017-07-15 22:53:37
tags:
	- php
	- thinkphp
categories: 技术博客
---
### 问题描述 ###
在Thinkphp的模版语言中，用if可以进行判断，如： 
 
{% codeblock lang:php %}
<if condition="$array.value eq 1">
	……
<else />
	……
</if>
{% endcodeblock %}  

在开发过程中，会从控制器传递多个参数到前端模版，并进行比较，如：  

{% codeblock lang:php %}
<if condition="$array.value eq $list.value">
	……
<else />
	……
</if>
{% endcodeblock %}  

这时发现，不管是否相等，程序都会执行 `else` 中的内容。  
<!-- more -->

### 解决办法 ###
查看thinkphp的[官方文档](http://doc.thinkphp.cn/manual/if.html)，也没有相关说明，只有示例：  

{% codeblock lang:php %}
<if condition="($name eq 1) OR ($name gt 100) "> value1
<elseif condition="$name eq 2"/>value2
<else /> value3
</if>
{% endcodeblock %}  

经过多次测试，发现只要改变变量的写法，将  

{% codeblock lang:php %}
$array.value
{% endcodeblock %}  

改为：  

{% codeblock lang:php %}
$array['value']
{% endcodeblock %}  

就可成功进行正常的if比较。  

{% codeblock lang:php %}
<if condition="$array['value'] eq $list['value']">
	……
<else />
	……
</if>
{% endcodeblock %}  