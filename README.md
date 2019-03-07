### 第一天：

#### 1.创建数据库local

创建集合blog
article
user
admin

#### 2.模板引擎整合html界面

遇到一个bug
nodejs整合静态资源出错，无法引入css,js,图片


```
const path=require("path");
server.use(express.static(path.join("static")));
```

#### 3.数据库命令

创建数据库 use数据库
删除数据库 use数据库->db.dropDatabase()
创建集合 db.createCollection("集合名")
删除集合 db.集合名.drop()

mongoDB的正确连接

```

MongoClient.connect(url, (err, db) => {
    var dbo = db.db("local");
    dbo.collection("article").find().toArray((err, result) => {
      if (err) throw err;
      var hansu = result;
      console.log(hansu);
    });

  });


```



### 第二天：整合文件目录

一开始准备随意弄一弄，但是想想还是整合一下开发目录，这样看起来结构会很清晰(而且还提升了整个网站的性能，从一开始的500ms提升到了160ms)

因为之前学过thinkphp的MVC模式，所以这里也模拟了一套nodejs的MVC结构
大体结构如下：

*	app.js//控制整个网站
   *static//存放静态资源:css,js,image
    *routes//路由管理，存放路由器，主要是web和admin这两个路由器
    *node_modules//各种nodejs的npm包
    *web//前台页面
    *models:模型，用来执行数据库操作
   *views:视图层，用来存放前台页面
   *controllers:控制层，执行一些行为
   *admin//后台页面
   *models:模型，用来执行数据库操作
   *views:视图层，用来存放后台页面
   *controllers:控制层，执行一些行为
   *readme.md//开发流程，详细记录都在这里
   *package.json

这样梳理整个开发结构就一目了然了。

接下来就是配置了

一.这里就不多讲了，列举几个我在配置的时候，遇到的几个bug

1.	模板引擎的配置

模板引擎在app.js中配置，默认是存放在app.js同级目录的views中，但是我们这里没有views,我们已经把views放到了web中，所以这里要修改下模板引擎的路径

```
const ejs = require("ejs");
server.set("view engine","ejs");
server.set("views","./web/views");

```
2.	静态资源不能加载

在请求静态资源的时候，我们会发现后台并没有返回对应请求路径的静态资源
解决方案如下，引入path模块
```
const path = require("path");
server.use(express.static(path.join("static")));
然在页面中修改路径即可，注意此时就可以省略static
比如web下views下的index.ejs要引入图片的话的地址就是“../../img/XX.pmg”
```

3.	如何写模型？

我们都知道模型用来







二.建立MVC过程遇到的问题：

1.因为原本连接MongoDB数据库用的是
MongoClient=require("mongodb").MongoClient;
这种方式的弊端就是无法暴露数据库的连接操作，每次执行数据库操作的时候都需要先连接。

比如：
```
MongoClient.connect(url,(err,db)=>{
var dbo=db.db("local");
dbo.collection("article").find().toArray((err,result)=>{
if(err) throw err;
console.log(result);
db.close();
});
});
```
而且里面有两个回调函数，很难获取里面的数据。

2.如何获取里面的回调函数的值

因为回调函数是异步操作，所以无法用return返回查询结果。

第一个解决方案就是设一个外部的全局变量，然后将查询结果赋值给这个变量，但是因为是异步，所以一开始如果全局变量没有赋值的话，会报出undefined,然后刷新在报出数据。

第二个解决方案是构建函数

models页面下的article.js
```
var article={
getArticleList:function(callback){ 
MongoClient.connect(url,(err,db)=>{
var dbo=db.db("local");
dbo.collection("article").find().toArray((err,result)=>{
if(err) throw err;
callback(result);
db.close();
});
});
}
}
module.exports=article;
```
web.js

```
router.get("/index",(req,res)=>{
    function getdata(data){res.result=data;res.render("index",{article:data});};
    Article.getArticleList(getdata);
    });
```

虽然这样能解决问题，但是很明显背离了MVC的本质，所以研究了一下，调整了另一种方案。

### 第三天：

一. MVC结构的调整

1.首先调整数据库的连接方式：

采取mongoose的方式进行数据库操作

```
var mongoose = require('mongoose');//引入mongoose

mongoose.connect("mongodb://localhost/local", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});//这步可以不写，只是用来检测是否连接成功

var Schema = mongoose.Schema;//用Schema创建模型
var mySchema = new Schema({
  author: String,
  title: String,
  content: String,
});
var Articles = mongoose.model('article', mySchema);
/*调用集合，这里有个注意点，我仔细研究了很久特别坑就是当数据库集合名必须是复数，模型才有效，mongoose会默认数据库中可数名词都为复数。这里提供了两种解决方案，创建的时候用复数形式，第二修改集合名
如何修改集合名：db.article.renameCollection("articles");
*/
module.exports={ArticleModel:Articles};
```

2.建立模型文件Article.js

```
var mongoose = require('mongoose');//引入mongoose
mongoose.connect("mongodb://localhost/local");
var Schema = mongoose.Schema;//用Schema创建模型
var mySchema = new Schema({
  author: String,
  title: String,
  content: String,
});
var Articles = mongoose.model('article', mySchema);
module.exports={ArticleModel:Articles};//暴露数据
```

3.建立控制器文件index.js

```
const Article=require("../models/Article").ArticleModel;//引入模型
var Articles={
index:function(req,res){
Article.find((err,result)=>{
if(err){throw err;}
res.render("index",{article:result});//使用模型进行数据库操作
});
}//控制访问地址后的操作
}

```

4.调整路由

因为网站有前台和后台页面所以打算分两个路由:web.js和admin.js,不多说直接贴代码

web.js:
```
const express=require("express");
const router=express.Router();
const Article=require("controllers/index");//引入控制器
router.get('url地址',Article.index);//调用控制器
router.post(..);

```
这样只要在app.js中把路由挂载到web下即可

5.app.js中挂载路由

```
var webRooter=require("routes/web.js");

server.use("/web",webRooter);

```

这样整个目录结构就瞬间清晰了很多。

![](structrue.png)

admin/web：存放前台和后台文件
Model:返回数据库模型
Views:存放引擎模板
Controller:执行数据库操作和其他操作,并控制渲染。
lib:放些插件
node_modules:存放一些nodejs模块
routes:存放路由器
static:放些静态资源
app.js/server.js:控制整个网站的路口


二. 后台制作

后台使用bootstrap可以快速搭建

主要注意一下几点即可

1.主要内容放在iframe中

<iframe src="url" scrolling="0" frameborder="0" id="mainframe" name="mainframe">
</iframe>

左侧列表放a标签 链接地址填好后，只要加上target="mainframe"就会在框架中打开，而不会另外打开一个窗口。

2.宽度正好是屏幕的宽度

2.1这个想了一下其实也很简单,我们可以试想一下横向填满我们肯定会。设置100%即可
所以只要设置container高度100%，子元素平均分配这100%就可以。但是这种百分比还得自己重新写因为bootstrap只提供了四种高度百分比。

2.2第二种解决方案，设置container弹性布局，纵向排列，这样子元素的主轴方向就是垂直的，这样只需要在某一个子元素上设置flex-grow:1，就可以自动填满父元素剩余的高度，完美解决。

2.3当然也可以有其他方法比如js等等

### 第四天：

一.后台完善——上传功能

1.multer的使用 一般

2.nodejs配置editor插件 快疯了

3.post无法同时解析文件和普通数据 电脑已砸

文件传输form只能设置成 `multipart/form-data`
但是设置后路由中无法读取普通数据的值，即req.body为空
找了很多方案，最后意外发现在multer中就可以读取req.body的数据。


4.emmm,本来以为大功告成却发现数据库崩了，没办法卸了重装一下就好了。还有就是大家建立model的时候数据库名字一定要正确，不然mongo数据库会在别的数据库中帮你创建一个集合，这个很蛋疼的。
还有一点就是，实例化对象mySchema的时候，一定要把数据和数据类型写全了，不然前台调用的时候会读不到数据。

5.查询id,mongoDB中的id比较长是数据库自动帮你创建的，如何直接获取会报错,可以用下面方式转换。

```
var ObjectId = mongoose.Types.ObjectId;
var $id=ObjectId(req.query.id);
```




修改集合中的属性名称：

db.admintors.update({},{$rename:{"邮箱":"email"}},false,true);



### 第五天:markdown编辑器的整合

因为博客使用markdown的语法，可是editor对markdown的语法支持并不友好。

于是果断忍痛割爱，重投再来。

* 这里选用了一款开源的markdown编辑器simplemde-markdown
* 具体用法请参考开源项目地址:[simplemde编辑器](https://github.com/sparksuite/simplemde-markdown-editor)
* 前台渲染时可以引入markdown.js美化markdown的样式
* [markdown样式](https://github.com/sindresorhus/github-markdown-css)



要说这款编辑器最大的弊端就是无法自动将markdown的语法转化为html.

所以就需要手动将markdown语法转化为html。因为之前项目都是form直接提交的，这意味着点击提交时获取文本框里的值只能是markdown语法的文章，所以需要对数据进行提前处理。这里思考了几种方法:

* form提交时做判断`<form onsubmit="fn()"></form>`
* 模拟触发submit按钮，禁止提交按钮的默认事件，重新定义单击事件，在函数中进行数据处理，然后模拟触发form.submit()
* 使用ajax，配合FormData，进行数据处理。

FormData是一个专门用来存储form表单中数据的对象。很类似文档碎片。会把form中的所有表格元素的name与value组成一个queryString。

这里有很多注意点

```
  var formdata=new FormData();
        formdata.append("author",$("[name=author]").val());
        formdata.append("title",$("[name=title]").val());
        formdata.append("summary",$("[name=summary]").val());
        formdata.append("cate",$("[name=cate]").val());
        formdata.append("content",testMarkdown);
        formdata.append("img",document.getElementById("file").files[0]);
        //不能写成$("#file").files[0],$("#file")返回的是一个结果集
        $.ajax({
        url:"/admin/add",
        type:"post",
        data:formdata,
       
        contentType:false,
        //取消帮我们格式化数据，是什么就是什么
        processData:false,
        success:function(result){}
        })
```

* 文件和数据同时上传时，需要修改编码格式
  * application/x-www-form-urlencoded  表单默认值，不能传输文件
  * multipart/form-data 可以用来传输文件
  * text/plain 纯文本
  * text/html html代码


* 文件值的获取，并不是value，而是要通过document.getElementById("file").files[0]或者是$("#file")[0].files[0]来获取文件对象
* contentType:false 设置false是防止jquery对传输的数据进行操作。设置false之后，文件和数据都会正常传输
* processData:false  processData用来描述是否对传输的数据进行序列化处理及将对象转换成查询字符串，true代表是，false代表否


### 第六天:优化功能

1.引入gittalk评论

具体的参考[gittalk插件配置](https://www.jianshu.com/p/78c64d07124d)

2.引入loading



3.分页功能



4.搜索功能



5.搜索提示





#### 搜索框细节：

1.由type="text"改为type="search"

这一改变的变化是用户手机端输入完由之前的前往变成了搜索

2.空白回车刷新问题

分析了一下因为是只有一个input的原因所以在后面添加了一个隐藏的input

```
<input type="hidden"> 
```

3.搜索框添加

### 第七天:上线

#### 1.mongoose连接问题:

```
mongodb://simpleUser:simplePass@your.db.ip.address:27017/foo
```

#### 2.图床问题

之前一直使用七牛云后来因为域名到期了，需要使用自己的域名。

但是自己的域名没有备案所以转而使用腾讯云的cos存储桶，效果还不错。

具体步骤如下:

* 登录腾讯云cos官网，创建存储桶列表（切记选择公有读私有写）
* 点进自己的云存储桶，在域名管理中去开启cdn服务否则图片链接无效
* 在密钥管理列表中前往云API密钥申请密钥
* 下载客户端工具，用刚才的密钥登入，直接拖拽自己想要上传的图片，然后在页面引入图片链接即可。

#### 3.服务器配置

##### 3.1LAMP

* 一键安装apache+mysql+php

##### 3.2LNMP（这里选择nginx作为服务器）

* 一键安装nginx+mysql+php
* 配置ftp，用来上传图片
* 安装node.js
* 安装pm2作为启动工具







