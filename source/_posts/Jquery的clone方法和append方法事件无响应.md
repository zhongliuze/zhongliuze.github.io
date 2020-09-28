---
title: Jquery的clone方法和append方法事件无响应
date: 2017-07-16 09:20:03
tags:
	- javascript
	- jquery
categories: 技术博客
---
在做一个公司的后台管理项目，使用了一个Bootstrap的后台管理模版，叫AdminLTE。当然它对表格用了bootstrap-datatables框架。后来发现这个datatables好像不可以响应式，以往都可以是响应式表格的。后来检查发现没有引入datatables-response.js文件。  
<!-- more -->
<center>![''](/images/2017/07/16/001.jpg)</center>

当页面缩放或变为手机端的时候，表格会进行缩放：  

<center>![''](/images/2017/07/16/002.jpg)</center>  

<center>![''](/images/2017/07/16/003.jpg)</center>  

可以看到，页面效果非常好，数据也能完整显示出来。  


----------

然后，问题就来了。  

<center>![''](/images/2017/07/16/004.jpg)</center>  

当行内有按钮的时候，点击会触发相应的事件。  

<center>![''](/images/2017/07/16/005.png)</center>  

当页面缩放，按钮还在同一行没被隐藏的时候，也可以触发相应事件。  

<center>![''](/images/2017/07/16/006.jpg)</center>  

当页面完全缩放，按钮被隐藏后，展开该行， 点击按钮，事件无法被触发。  

这是个很棘手的问题。  

第一反应是会不会隐藏后有个图层盖在按钮上方导致无法点击，点击实际是点击在图层上（因为之前遇到过这种情况），然后我检查页面css，检查框架的datatables-response.css文件，设置z-index=999；改变postion等属性，均没用。  

这时我很郁闷，怎么可能是宽屏幕可以触发事件，窄屏缩放后就无法触发呢，这是个BUG啊！  

然后老夫就打开框架的datatables-response.js文件，没错，研究源码。我还喊了同窗大神@社会我杰哥人丑逼事多来帮我查看源码。  

我看了半天源码，没看懂！  

我又看了几遍，结合检查页面，大概懂了源码中的意思：当页面缩放到表格的某一列不能正常显示的时候，就把这一列的html标签全部拷贝到另一个html标签内并隐藏。当点击展开按钮的时候，再把拷贝过来的内容重新显示出来。  

熟悉原理后，就猜到它要拷贝html代码，必定用的是jquery的clone方法，这个方法好像是不能拷贝代码所带的事件的，百度一搜，果然，一大堆。  

百度出来的解决方法大概就是说，当指定clone的值为true时，html标签内的事件也会拷贝过来，如：  

{% codeblock lang:html %}
<html>
<head>
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $("button").click(function(){
    $("body").append($("p:first").clone(true));
  });
  $("p").click(function(){
    $(this).animate({fontSize:"+=1px"});
  });
});
</script>
</head>
<body>

<p>点击本段落可以增加文本的大小。事件处理器同样被复制到新的段落。</p>
<button>复制每个 p 元素，然后追加到 body 元素</button>

</body>
</html>
{% endcodeblock %}  

> $(selector).clone(includeEvents)  
> includeEvents可选,布尔值,规定是否复制元素的所有事件处理。默认地，副本中不包含事件处理器。  

果然可以，我就立马去修改datatables-response.js框架源码，找到clone方法所在，将clone()全改成了clone(true)  

{% codeblock lang:javascript %}
    // Clone the table with the current data in it
	var tableWidth   = dt.table().node().offsetWidth;
	var columnWidths = dt.columns;
	var clonedTable  = dt.table().node().cloneNode( false );
	var clonedHeader = $( dt.table().header().cloneNode( false ) ).appendTo( clonedTable );
	var clonedBody   = $( dt.table().body().cloneNode( false ) ).appendTo( clonedTable );

	$( dt.table().footer() ).clone( true ).appendTo( clonedTable );

	// This is a bit slow, but we need to get a clone of each row that
	// includes all columns. As such, try to do this as little as possible.
	dt.rows( { page: 'current' } ).indexes().flatten().each( function ( idx ) {
		var clone = dt.row( idx ).node().cloneNode( true );
			
		if ( dt.columns( ':hidden' ).flatten().length ) {
			$( true ).append( dt.cells( idx, ':hidden' ).nodes().to$().clone( true ) );
		}

		$(clone).appendTo( clonedBody );
	} );

	var cells = dt.columns().header().to$().clone( true );
	$('<tr/>')
		.append( cells )
		.appendTo( clonedHeader );
	}
{% endcodeblock %}  

接着我满怀期待的刷新页面，发现依然无效。  

梦，碎了一地。  

后来我到处改，修改源码，依旧不行。  

看来还是我没弄懂源代码，倒是改哪哪都不行。因为要忙小程序，这个项目就搁置了。  


----------

在做小程序的后台的时候，用到了jquery的append方法，发现它也是不能将事件添加过去。查了文档，它倒是没有可传递的true参数。  

> $(selector).append(content)  
> content规定要插入的内容（可包含 HTML 标签）。

这个怎么解决呢？网上好多都是说用jquery的live()和delegate()方法。因为之前踩过坑，知道live()方法是老版本的jquery的方法，新版jquery用on方法来替代了。  

> on() 方法在被选元素及子元素上添加一个或多个事件处理程序。  
> 
> 自 jQuery 版本 1.7 起，on() 方法是 bind()、live() 和 delegate() 方法的新的替代品。该方法给 API 带来很多便利，我们推荐使用该方法，它简化了 jQuery 代码库。  
> 
> 注意：使用 on() 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）。  
> 
> $(selector).on(event,childSelector,data,function,map)  
> 
- event：规定要从被选元素移除的一个或多个事件或命名空间
- childSelector：规定只能添加到指定的子元素上的事件处理程序（且不是选择器本身，比如已废弃的 delegate() 方法）
- data：规定传递到函数的额外数据
- function：规定当事件发生时运行的函数
- map：规定事件映射 ({event:function, event:function, ...})，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数

也就是说我们可以这样用on方法：

{% codeblock lang:javascript %}
    //本来可以这样写
    $("p").click(function(){
        alert('test');
    });
   
    //现在可以这样写
    $("p").on("click",function(){
        alert("The paragraph was clicked.");
    });

    //还可以这样写
    $("body").on("click","p",function(){
      alert("The paragraph was clicked.");
    });
{% endcodeblock %}  

以上方法均可以触发弹框，关键是第三种写法，首先绑定了body，接着在监听p，这是什么意思呢？  

我们注意到之前官方文档提到一句话  

> 注意：使用 on() 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）。  

因为body标签事件是整个页面生命周期一直存在的，p或其它元素可能是当前或未来脚本创建的元素，也就是说这种写法可以解决append方法事件。  

后来我想了下，同样是对于未来的元素，clone()方法是不是也能用on的这种写法解决？  

我将监听事件修改了后发现，果然可以。  

{% codeblock lang:javascript %}
    $('body').on('click','.text-center #test',function () {
      alert('133');
    });
{% endcodeblock %}  

<center>![''](/images/2017/07/16/007.png)</center>  

页面缩放后，也可以正常响应事件。  

现在的我还在前往汉口的火车上，好困~