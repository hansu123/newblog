const express=require("express");
const server=express();

//解析post请求
const bodyParser=require("body-parser");

server.use(bodyParser.urlencoded({
    extended:false
}));
//server.use(bodyParser.json());

//模板引擎配置开始
const ejs = require("ejs");
const path = require("path");
server.set("views","./admin/views");//设置模板引擎的路径为web/views
server.set("view engine", "ejs");//配置引擎的模板为ejs


server.use(express.static(path.join("static")));
//模板引擎配置结束

server.use(express.static("./views/admin"));



server.listen(4000,(err)=>{

    if(err){
        throw err;
    }
    console.log("连接成功");
    });


const adminRouter=require("./routes/admin");

server.use("/admin",adminRouter);




//加载ueditor 模块
const ueditor = require("ueditor");
 
//使用模块
server.use("/ueditor/ue", ueditor(path.join(__dirname, 'static'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/img/'
     var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));




