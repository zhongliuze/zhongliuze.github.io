---
title: Flex布局详解
date: 2017-07-09 01:01:41
tags:
	- flex
	- css
categories: 技术博客
---
网页布局（Layout）是CSS的一个重点应用。布局的传统解决方案，基于[盒状模型](http://www.w3school.com.cn/css/css_boxmodel.asp)，依赖 [display](http://www.w3school.com.cn/cssref/pr_class_display.asp) 属性 + [position](http://www.w3school.com.cn/cssref/pr_class_position.asp)属性 + [float](http://www.w3school.com.cn/cssref/pr_class_float.asp)属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。  

2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。  

<center>!['Flex'](/images/2017/07/09/001.png)</center>  


<!-- more -->
Flex 布局将成为未来布局的首选方案,本文介绍它的基本知识。网友 [JailBreak](http://vgee.cn/) 为本文的所有示例制作了 Demo，也可以参考。  

<center>!['Flex'](/images/2017/07/09/002.jpg)</center>  

以下内容主要参考了下面两篇文章：[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 和 [A Visual Guide to CSS3 Flexbox Properties。](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)  

### Flex 布局是什么？ ###

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。  

任何一个容器都可以指定为 Flex 布局。  

{% codeblock lang:css %}
.box{
  display: flex;
}
{% endcodeblock %}  

行内元素也可以使用 Flex 布局。  

{% codeblock lang:css %}
.box{
  display: inline-flex;
}
{% endcodeblock %}  

Webkit 内核的浏览器，必须加上-webkit前缀。  

{% codeblock lang:css %}
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
{% endcodeblock %}  

**注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。**  

### 基本概念 ###

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。  

<center>!['Flex'](/images/2017/07/09/003.png)</center>  

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 `main start`，结束位置叫做 `main end`；交叉轴的开始位置叫做 `cross start`，结束位置叫做 `cross end`。  

项目默认沿主轴排列。单个项目占据的主轴空间叫做 `main size`，占据的交叉轴空间叫做 `cross size`。  

### 容器的属性 ###  

以下6个属性设置在容器上:  

- lex-direction
- flex-wrap
- flex-flow  
- justify-content  
- align-items 
- align-content  

#### flex-direction属性 ####
`flex-direction` 属性决定主轴的方向（即项目的排列方向）。  

{% codeblock lang:css %}
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
{% endcodeblock %}  

它有4个值：  

- **row（默认值）**：主轴为水平方向，起点在左端  
- **row-reverse**：主轴为水平方向，起点在右端  
- **column**：主轴为垂直方向，起点在上沿  
- **column-reverse**：主轴为垂直方向，起点在下沿

<center>!['Flex'](/images/2017/07/09/004.png)</center>  

#### flex-wrap属性 ####
默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap` 属性定义，如果一条轴线排不下，如何换行。

<center>!['Flex'](/images/2017/07/09/005.png)</center>  

{% codeblock lang:css %}
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
{% endcodeblock %}  

它可能取三个值：  

（1）`nowrap`（默认）：不换行  

<center>!['Flex'](/images/2017/07/09/006.png)</center>  

（2）`wrap`：换行，第一行在上方  

<center>!['Flex'](/images/2017/07/09/007.jpg)</center>  

（3）`wrap-reverse`：换行，第一行在下方  

<center>!['Flex'](/images/2017/07/09/008.jpg)</center>  

#### flex-flow属性 ####
`flex-flow` 属性是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap`。  

{% codeblock lang:css %}
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
{% endcodeblock %}  

#### justify-content属性 ####
`justify-content` 属性定义了项目在主轴上的对齐方式。  

{% codeblock lang:css %}
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
{% endcodeblock %}  

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。  

- **flex-start（默认值）**：左对齐  
- **flex-end**：右对齐  
- **center**： 居中  
- **space-betwee**n：两端对齐，项目之间的间隔都相等  
- **space-around**：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍  

<center>!['Flex'](/images/2017/07/09/009.png)</center>  

#### align-items属性 ####
`align-items` 属性定义项目在交叉轴上如何对齐。  

{% codeblock lang:css %}
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
{% endcodeblock %}  

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。  

- **flex-start**：交叉轴的起点对齐  
- **flex-end**：交叉轴的终点对齐  
- **center**：交叉轴的中点对齐  
- **baseline**: 项目的第一行文字的基线对齐  
- **stretch（默认值）**：如果项目未设置高度或设为auto，将占满整个容器的高度  

<center>!['Flex'](/images/2017/07/09/010.png)</center>  

#### align-content属性 ####
`align-content` 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。  

{% codeblock lang:css %}
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
{% endcodeblock %}  

该属性可能取6个值:  

- **flex-start**：与交叉轴的起点对齐  
- **flex-end**：与交叉轴的终点对齐  
- **center**：与交叉轴的中点对齐  
- **space-between：**与交叉轴两端对齐，轴线之间的间隔平均分布  
- **space-around**：每根轴线两侧的间隔都相等，所以，轴线之间的间隔比轴线与边框的间隔大一倍  
- **stretch（默认值**）：轴线占满整个交叉轴  

<center>!['Flex'](/images/2017/07/09/011.png)</center>  

### 项目的属性 ###
以下6个属性设置在项目上：  

- order  
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

#### order属性 ####
`order` 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。  

{% codeblock lang:css %}
.item {
  order: <integer>;
}
{% endcodeblock %}  

<center>!['Flex'](/images/2017/07/09/012.png)</center>  

#### flex-grow属性 ####
`flex-grow` 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。  

{% codeblock lang:css %}
.item {
  flex-grow: <number>; /* default 0 */
}
{% endcodeblock %}  

<center>!['Flex'](/images/2017/07/09/013.png)</center>  

如果所有项目的 `flex-grow` 属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow` 属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。  

#### flex-shrink属性 ####
`flex-shrink` 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。  

{% codeblock lang:css %}
.item {
  flex-shrink: <number>; /* default 1 */
}
{% endcodeblock %}  

<center>!['Flex'](/images/2017/07/09/014.jpg)</center>  

如果所有项目的 `flex-shrink` 属性都为1，当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为0，其他项目都为1，则空间不足时，前者不缩小。  

负值对该属性无效。  

#### flex-basis属性 ####
`flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 `auto`，即项目的本来大小。  

{% codeblock lang:css %}
.item {
  flex-basis: <length> | auto; /* default auto */
}
{% endcodeblock %}  

它可以设为跟 `width` 或 `height` 属性一样的值（比如350px），则项目将占据固定空间。  

#### flex属性 ####
`flex` 属性是 `flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。  

{% codeblock lang:css %}
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
{% endcodeblock %}  

该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。  

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。  

#### align-self属性 ####
`align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`。  

{% codeblock lang:css %}
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
{% endcodeblock %}  

<center>!['Flex'](/images/2017/07/09/015.png)</center>  

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。  


----------
题外话：目前微信小程序采用的布局方式是flex，所以非常值得学习，未来的方向也很有可能是flex，而不是float了。
