---
title: Jquery中addClass与removeClass及toggleClass方法的区别
date: 2017-07-15 23:28:14
tags:
	- javascript
	- jquery
categories: 技术博客
---
其实toggleClass()方法就类似于这样的，如：  

{% codeblock lang:javascript %}
<script>
  $("test").toggleClass("className");
  
  //等同于
  if($("selector").hasClass("className")){
    $(this).removeClass("className");
  } else {
    $(this).addClass("className");
  }
  
  //也等同于
  $("selector").hasClass('className') ? $("selector").removeClass('className') : $("selector").addClass('className');
</script>
{% endcodeblock %}  
<!--more -->

.addClass("className")方法是用来给指定元素增加类名，也就是说给指定的元素追加样式；  

.removeClass("className")方法是用来给指定的元素移除类名，也就是说给指定元素移除样式；  

.toggleClass("className")方法是用来给脂定的元素增加或移除类名（如果元素的类名存在就移除，如果不存在就增加），也就是说用来给指定的元素进行样式切换（如果元素存在样式则去掉，如果不存在则加上样式）。