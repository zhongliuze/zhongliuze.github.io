---
title: JavaScript中括号和大括号的区别和使用详解
date: 2017-07-08 15:43:17
tags:
	- javascript
categories: 技术博客
---
### { }大括号 ###  

> { } 大括号，表示定义一个对象，大部分情况下要有成对的属性和值，或是函数。  

{% codeblock lang:javascript %}
var LangShen = {"Name":"Langshen","AGE":"28"}; 
{% endcodeblock %}  
<!-- more -->
上面声明了一个名为“LangShen”的对象，多个属性或函数用,（逗号）隔开，因为是对象的属性，所以访问时，应该用.（点）来层层访问： `LangShen.Name` 、 `LangShen.AGE` ，当然我们也可以用数组的方式来访问，如： `LangShen["Name"]` 、 `LangShen["AGE"]` ，结果是一样的。  

该写法，在JSON数据结构中经常用，除此之外，我们平时写函数组的时候，也经常用到：  

{% codeblock lang:javascript %}
var LangShen = { 
  Name = function(){ 
    return "LangShen"; 
  }, 
  Age = function(){ 
    return "28"; 
  } 
}  
{% endcodeblock %}  

调用方式差不多，因为是函数组，所以要加上()：  

{% codeblock lang:javascript %}
alert(LangShen.Name()); 
{% endcodeblock %}  

### [ ]中括号 ###  

> [ ]中括号，表示一个数组，也可以理解为一个数组对象。  

{% codeblock lang:javascript %}
var LangShen = [ "Name","LangShen","AGE","28" ];  
{% endcodeblock %}  

很明显，每个值或函数，都是独立的，多个值之间只用,（逗号）隔开，因为是数组对象，所以它等于：  

{% codeblock lang:javascript %}
var LangShen = Array( "Name","LangShen","AGE","28" );  
{% endcodeblock %}  

访问时，也是和数组一样：   

{% codeblock lang:javascript %}
alert( LangShen[0] );  
{% endcodeblock %}  

### { } 和[ ] 一起使用 ###  

> { } 和[ ] 一起使用，可以组成一个对象数组。  

{% codeblock lang:javascript %}
var LangShen = { "Name":"Langshen", 
"MyWife":[ "LuLu","26" ], 
"MySon":[{"Name":"Son1"},{"Name":"Son2"},{"Name":"Son3"}] 
}  
{% endcodeblock %}  

从上面的结构来看，是一个对象里面的第一项是个属性，第二项是一个数组，第三个是包含有多个对象的数组。调用起来，也是一层一层访问，对象的属性用.（点）叠加，数组用 [下标] 来访问。  
 
{% codeblock lang:javascript %}
alert(LangShen.MySon[1].Name);
{% endcodeblock %}  

老夫告辞！