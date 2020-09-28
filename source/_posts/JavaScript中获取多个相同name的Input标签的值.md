---
title: JavaScript中获取多个相同name的Input标签的值
date: 2017-07-15 23:13:33
tags:
	- javascript
categories: 技术博客
---
当遇到Input标签，用Jquery取值是非常方便的，如：  

{% codeblock lang:javascript %}
<input type="text" name="test" value="test" />

<script>
var test = $("input[name='test']").val();
</script>
{% endcodeblock %}  

当有多个相同的name标签的时候，怎么取值呢？  
<!-- more -->

{% codeblock lang:html %}
<body>
  <input type="text" name="test" value="test1" />
  <input type="text" name="test" value="test2" />
  <input type="text" name="test" value="test3" />
  <input type="text" name="test" value="test4" />
  <input type="text" name="test" value="test5" />
</body>
{% endcodeblock %}  

面对这种情况的时候，取input标签的值应用下方法：  

{% codeblock lang:javascript %}
<body>
  <input type="text" name="test[]" value="test1" />
  <input type="text" name="test[]" value="test2" />
  <input type="text" name="test[]" value="test3" />
  <input type="text" name="test[]" value="test4" />
  <input type="text" name="test[]" value="test5" />
</body>

<script>
  $('#save-project').click(function () {
    var data_array = {};
    $("input[name='test[]']").each(function(i){
        data_array[i] = $(this).val(); //这里的value就是每一个input的value值~
    });
    console.log(data_array);
});

</script>
{% endcodeblock %}  

这样子，最后就可将input的值填入到数组中。