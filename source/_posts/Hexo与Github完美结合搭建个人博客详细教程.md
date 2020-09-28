---
title: Hexo与Github完美结合搭建个人博客详细教程
date: 2017-06-12 19:39:45
tags:
	- Hexo
	- Github
	- Git
categories: 技术教程
---
上次说到要讲解下如何搭建我的个人博客的，今天就抽空写一个完整版的。首先介绍下博客需要用的技术和框架支持分别是：Node.js、Hexo、Git、Github。下面就开始讲解如何搭建Hexo静态博客系统。 
<!-- more -->
### 安装部署Node.js ###
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 
Node.js 的包管理器 npm，是全球最大的开源库生态系统。 
 
#### 下载Node.js ####
- [Node.js官网](http://www.nodejs.org/  "Node.js官网")
- [Node.js中文官网](http://www.nodejs.cn/  "Node.js中文官网")
- [Node.js官网下载网址](http://nodejs.cn/download/  "Node.js官网下载网址")
- [Node.js国内镜像Windows 32位下载](https://npm.taobao.org/mirrors/node/v8.0.0/node-v8.0.0-x86.msi  "Node.js国内镜像Windows 32位下载")
- [Node.js国内镜像Windows 64位下载（推荐）](https://npm.taobao.org/mirrors/node/v8.0.0/node-v8.0.0-x64.msi  "Node.js国内镜像Windows 64位下载（推荐）")
- [Node.js国内镜像MAC 64位下载](https://npm.taobao.org/mirrors/node/v8.0.0/node-v8.0.0.pkg  "Node.js国内镜像Mac 64位下载")  

#### 安装Node.js ####
下载的msi文件可直接安装，双击程序启动安装安装界面如图1.1所示。  

<center>!['Node.js安装界面图'](/images/2017/06/12/001.jpg)</center>
<center><font size="2">图1.1 Node.js安装界面图</font></center>  
因为系统安装都是默认设置，所以勾选同意后，一直点击 `Next` 就可以了。安装完成后点击 `Finish` 关闭安装窗口。
#### 测试安装结果 ####
为了检查Node.js是否成功安装，我们需要 `Win+R` 打开命令工具输入 `cmd` 打开系统命令行窗口。  
在命令行中输入
{% codeblock lang:cmd %}
node -v  
npm -v
{% endcodeblock %}若提示**不是内部或外部命令，也不是可运行的程序或批处理文件**则表示安装失败，需要重新检查一下自己安装的过程。正确的回显如图1.2所示。  

<center>!['Node.js成功安装测试回显'](/images/2017/06/12/002.jpg)</center>
<center><font size="2">图1.2 Node.js成功安装测试回显</font></center>  

### 安装部署Git ###
Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
#### 下载Git ####
- [Git官网](http://www.git-scm.com/ "Git官网")
- [Git国内镜像Windows 32位](http://dlsw.baidu.com/sw-search-sp/soft/4e/30195/Git-2.7.2-32-bit_setup.1457942412.exe "Git国内镜像Windows 32位")
- [Git国内镜像Windows 64位](http://dlsw.baidu.com/sw-search-sp/soft/e7/40642/Git-2.7.2-64-bit_setup.1457942968.exe "Git国内镜像Windows 64位")

#### 安装Git ####
下载完成后打开安装程序，同Node.js一样，均使用默认设置，所以点击 `Next` 到完成后点击 `Finish` 关闭安装窗口，启动安装图如下2.1所示。  

<center>!['Git安装界面图'](/images/2017/06/12/003.jpg)</center>
<center><font size="2">图2.1 Git安装界面图</font></center>  

#### 测试安装结果 ####
检查Git是否成功安装，在桌面空白处右键会发现有 `Git Bash Here` 选项，点击启动Git命令行，输入命令{% codeblock lang:cmd %}
git --version
{% endcodeblock %}若成功安装，系统会回显git的版本号，如图2.2所示。  

<center>!['Git成功安装回显图'](/images/2017/06/12/004.jpg)</center>
<center><font size="2">图2.2 Git成功安装回显图</font></center>  

接下来我们测试下Git的环境变量是否也成功配置，我们打开cmd命令行，同样输入上面的命令，若提示**git不是内部或外部命令，也不是可运行的程序或批处理文件**则环境变量未配置成功。  
解决方法：右键我的电脑->属性->高级系统设置->环境变量->系统变量中找到Path变量，双击编辑。在最后粘贴Git安装路径中bin文件夹的路径，如 `;D:\Program Files\Git\bin;` 然后确定保存修改，如图2.3所示。  

<center>!['设置Git环境变量'](/images/2017/06/12/005.jpg)</center>
<center><font size="2">图2.3 设置Git环境变量</font></center>  

接着关闭cmd命令窗口，重新打开，再次输入命令，若显示Git的版本信息则环境变量配置成功。  
### Github账户创建与配置 ###
- [Github官网](https://github.com/ "Github官网")
- [注册Github](https://github.com/join?source=header-home "注册Github")
- [登录Github](https://github.com/login "登录Github")  

#### 创建代码库 ####
成功登陆后，点击页面右上角的+号，选择 `New repository` 进入新建代码库页面。如图3.1所示。 
 
<center>!['创建代码库'](/images/2017/06/12/006.jpg)</center>
<center><font size="2">图3.1 创建代码库</font></center>  

在Repository name下填写yourname.github.io，Description (optional)下填写一些简单的描述（不写也没有关系），如图所示
yourname是指的你github名称，比如我的github名叫liuzezhong,那么Repository name下填写的应该是liuzezhong.github.io  

<center>!['输入代码库名'](/images/2017/06/12/007.jpg)</center>
<center><font size="2">图3.2 输入代码库名</font></center>  

#### 代码库设置 ####
创建成功后会显示图3.3所示的的页面。  

<center>!['创建成功'](/images/2017/06/12/008.jpg)</center>
<center><font size="2">图3.3 创建成功</font></center>  

接下来我们要开启Gihub-Page功能,点击导航栏的 `Settings` 按钮，进入代码库设置页面，找到 `Github Page` 模块。如图3.4所示。  

<center>!['Gihub-Page'](/images/2017/06/12/009.jpg)</center>
<center><font size="2">图3.4 Gihub-Page</font></center> 

点击 `Choose a theme` 按钮，随意选择一个Page模版，点击 `Commit changes` 保存即可。  

<center>!['选择模版'](/images/2017/06/12/010.jpg)</center>
<center><font size="2">图3.5 选择模版</font></center>  

这时，在浏览器中输入yourname.github.io就可以看到一个独立的页面出来，如图3.6所示。如果没有，需要回头检查下自己的配置是否出错。  

<center>!['独立页面'](/images/2017/06/12/011.jpg)</center>
<center><font size="2">图3.6 独立页面</font></center>  

#### 将Git连接到Github ####
首先打开Git Bash命令窗口，输入命令绑定Github的账户：{% codeblock lang:cmd %}
$ git config --global user.name "liuzezhong"
$ git config --global user.email zhongliuze@gmail.com
{% endcodeblock %}接着输入命令生成密钥：{% codeblock lang:cmd %}
$ ssh-keygen -t rsa -C "zhongliuze@gmail.com"
{% endcodeblock %}会提示输入密钥保存路径，直接按Enter键默认路径即可。生成成功后打开默认密钥保存的位置，我的是 `C:\Users\liuzezhong\.ssh` ，`id_rsa.pub` 里面保存的就是我们需要的密钥，如图3.7所示。  

<center>!['密钥保存位置'](/images/2017/06/12/012.jpg)</center>
<center><font size="2">图3.7 密钥保存位置</font></center>  

打开Github的设置页面。进入 `SSH and GPG keys` 页面，单击 `New SSH key` 按钮，随意取个名字如“liuzezhong-PC”,然后将 `id_rsa.pub` 内容完全粘贴至key的输入框内，点击 `Add SHH key` 保存。  

<center>!['密钥保存位置'](/images/2017/06/12/013.jpg)</center>
<center><font size="2">图3.8 输入密钥</font></center>  

保存成功后，回到git bash命令行，输入{% codeblock lang:cmd %}
$ ssh git@github.com
{% endcodeblock %}检测是否成功链接github
正常情况回显如下图所示：  

<center>!['密钥保存位置'](/images/2017/06/12/014.jpg)</center>
<center><font size="2">图3.9 输入密钥</font></center>  

### 安装Hexo ###
#### 安装模块 ####
在合适的地方建一个文件夹，比如 `D:\Program Files (x86)\Hexo` ，用cmd命令行窗口进入该目录，在命令行中输入：{% codeblock lang:cmd %}
npm install hexo-cli -g
{% endcodeblock %}如图4.1所示，安装时间可能会比较久，耐心等待。  

<center>!['安装Hexo'](/images/2017/06/12/015.jpg)</center>
<center><font size="2">图4.1 安装hexo</font></center>  


安装完成后接着输入命令：{% codeblock lang:cmd %}
npm install hexo --save
{% endcodeblock %}如图4.2所示。安装过程会出现一些Warning报错，不过没关系，不影响，直接忽略即可。  

<center>!['保存安装Hexo的配置'](/images/2017/06/12/016.jpg)</center>
<center><font size="2">图4.2 保存安装Hexo的配置</font></center>  

安装完成后继续输入命令：{% codeblock lang:cmd %}
hexo -v
{% endcodeblock %}检测是否安装成功，若安装成功回显应如图4.3所示。  

<center>!['检测是否安装成功'](/images/2017/06/12/017.jpg)</center>
<center><font size="2">图4.3 检测是否安装成功</font></center>  

#### 配置Hexo ####
在适合的地方新建一个文件夹，存放博客文件，如 `E:\myblog` ，用 `cmd` 命令行进入该目录，
输入命令：{% codeblock lang:cmd %}
hexo init
{% endcodeblock %}会加载hexo组建，如图4.4所示，你会发现myblog目录下会多了许多文件和文件夹，这些都是hexo博客文件。  

<center>!['生成博客文件'](/images/2017/06/12/018.jpg)</center>
<center><font size="2">图4.4 生成博客文件</font></center>  

模块安装完成后需要安装hexo依赖的一些组件，输入命令：{% codeblock lang:cmd %}
hexo install
{% endcodeblock %}完成后接着输入命令部署hexo，如图4.5所示。{% codeblock lang:cmd %}
hexo g
{% endcodeblock %}  

<center>!['部署hexo'](/images/2017/06/12/019.jpg)</center>
<center><font size="2">图4.5 部署hexo</font></center>  

接着输入命令打开hexo服务：{% codeblock lang:cmd %}
hexo s
{% endcodeblock %}如图4.6所示。  

<center>!['打开hexo服务'](/images/2017/06/12/020.jpg)</center>
<center><font size="2">图4.6 打开hexo服务</font></center>  


打开 `http://localhost:4000/`，若页面显示如下，则代表hexo安装部署成功。

<center>!['部署成功页面'](/images/2017/06/12/021.jpg)</center>
<center><font size="2">图4.7 部署成功页面</font></center>  

#### Hexo连接Github Page ####
在 `myblog` 目录下，有一个 `_config.yml` 文件，打开找到 `Deployment` 作如下修改（将github名字修改成你自己的名字）：
{% codeblock lang:cmd %}
deploy:
  type: git
  repo: git@github.com:liuzezhong/liuzezhong.github.io.git
  branch: master
{% endcodeblock %}到此，搭建hexo博客的相关环境配置已经全部配置完成。  

### Hexo使用 ###
由于Hexo是使用Markdown语法编写的静态页面，所以每次更新博客的时候需要在电脑上先用Markdown语法写好，再用命令编译生成静态页面，最后提交到github page中显示。所以下面介绍下Hexo的使用及常用的命令。  

新建一篇文章，执行下面的命令：
{% codeblock lang:cmd %}
hexo new post "article title"
{% endcodeblock %}

<center>!['新建文章'](/images/2017/06/12/022.jpg)</center>
<center><font size="2">图5.1 新建文章</font></center>  

这时在我的电脑目录下 `E:\blog\source\_posts` 将看到 `Hexo与Github完美结合搭建个人博客详细教程.md` 文件，用MarDown编辑器打开就可以编辑文章了。文章编辑好之后，运行生成、部署命令：{% codeblock lang:cmd %}
hexo g   // 生成
hexo d   // 部署
{% endcodeblock %}
当然你也可以执行下面的命令，相当于上面两条命令的效果
{% codeblock lang:cmd %}
hexo d -g #在部署前先生成
{% endcodeblock %}  

<center>!['部署生成'](/images/2017/06/12/023.jpg)</center>
<center><font size="2">图5.2 部署生成</font></center>  


部署成功后访问你的Github Page地址,如 `https://liuzezhong.github.io` 将可以看到生成的文章。  

### Hexo主题 ### 
hexo有许多优美的主题，每个不同的主题会需要不同的配置，主题配置文件在主题目录下的`_config.yml` 。  
[点此挑选hexo的主题](https://hexo.io/themes/)  

我的网站的主题是Next，简洁美观。目前Github上Star最高的Hexo主题，支持几种不同的风格，提供了非常完善的配置说明。

详细的主题配置请参考[《Next主题的官方文档》](http://theme-next.iissnan.com/getting-started.html)  

由于使用Markdown语法写博客，推荐使用MarkdownPad2编辑器，非常好用。  
[MarkdownPad2免费破解版](https://eyun.baidu.com/s/3mi4w4E8 "密码：E9Ar")  
提取密码：`E9Ar`