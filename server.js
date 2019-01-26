const express=require("express");
const server=express();

//解析post请求
const bodyParser=require("body-parser");

server.use(bodyParser.urlencoded({
    extend:false
}));


//模板引擎配置开始
const ejs = require("ejs");
const path = require("path");
server.set("views","./admin/views");//设置模板引擎的路径为web/views
server.set("view engine", "ejs");//配置引擎的模板为ejs


server.use(express.static(path.join("static")));
//模板引擎配置结束

server.use(express.static("./views/admin"));



server.listen(3000,(err)=>{

    if(err){
        throw err;
    }
    console.log("连接成功");
    });


const adminRouter=require("./routes/admin");

server.use("/admin",adminRouter);