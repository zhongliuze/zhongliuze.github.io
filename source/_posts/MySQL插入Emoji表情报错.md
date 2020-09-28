---
title: MySQL插入Emoji表情报错
date: 2017-08-30 11:28:22
tags:
    - phpstrom
    - macos
    - emoji
    - mysql
categories: 技术博客
---
在做微信小程序的开发的时候，用户授权登陆后我将用户信息写入数据库，在写入过程中偶尔会出现写入失败的错误。经过查找，发现某一些用户的昵称带表情比如“liuzezhong😎”这种带Emoji或Apple系统自带表情都会报错，错误信息如下：  

> Incorrect string value: '\xF0\x9F...' for column 'XXX' at row 1

这个问题，原因是UTF-8编码有可能是两个、三个、四个字节。Emoji表情或者某些特殊字符是4个字节，而MySQL的utf8编码最多3个字节，所以数据插不进去。  <!-- more -->

我的解决方案：  

#### 在MySQL安装目录找到配置文件
在windows平台MySQL的配置文件是my.ini,在macOS平台MySQL的配置文件时是my.cnf。  

my.cnf的路径是 `/etc/my.cnf` 。  

如果此路径下没有my.cnf的话，在 `/usr/local/mysql/support-files` 下有一个my-default.cnf，只要把这个文件复制到/etc/下，再改名成my.cnf就好了。  

在MySQL5.7中,MacOS下默认没有my.cnf文件，哪怕是上述路径中也不存在my-default.cnf。  

那我们直接在/etc目录下新建my.cnf即可。  

在my.ini或my.cnf中修改或追加如下代码：  

{% codeblock lang:cmd %}
[mysqld]
character-set-server=utf8mb4
 
[client]
default-character-set=utf8mb4
 
[mysql]
default-character-set=utf8mb4
{% endcodeblock %}  

修改完成后，重启MySQL服务器。  

可执行SQL语句查看修改后的编码格式  
 
{% codeblock lang:sql %}
show variables like '%character%';
{% endcodeblock %}  

#### 将已经建好的表也转换成utf8mb4
执行sql语句更改数据库编码  
{% codeblock lang:sql %}
ALTER DATABASE DATABASE_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
alter table TABLE_NAME convert to character set utf8mb4 collate utf8mb4_bin; 
{% endcodeblock %}  


_参考文章：http://blog.csdn.NET/likendsl/article/details/7530979 _


