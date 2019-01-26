const express = require("express");
const server = express();


//模板引擎配置开始
const ejs = require("ejs");
const path = require("path");
server.set("views","./web/views");//设置模板引擎的路径为web/views
server.set("view engine", "ejs");//配置引擎的模板为ejs


server.use(express.static(path.join("static")));
//模板引擎配置结束



server.listen(3000, (err) => {
  if (err) {
    throw err;
  }
  console.log("创建成功");

});



server.use(express.static("./views/web"));

const webRouter=require("./routes/web");

server.use("/web",webRouter);





/*
var ObjectId = require("mongodb").ObjectId;//

server.get("/detail", (req, res) => {
  
var $id=ObjectId(req.query.id);
console.log($id);

if($id){

MongoClient.connect(url,(err,db)=>{

var dbo=db.db("local");
dbo.collection("article").find({_id:$id}).toArray((err,result)=>{

if(err){throw err;}
console.log(result);
res.articleDetail=result;
  res.render("detail", {
    detail:res.articleDetail
  });

});

});




}


});

*/

/*

server.get("/add", (req, res) => {

  MongoClient.connect(url, (err, db) => {

    var dbo = db.db("local");
    dbo.collection("article").insert({
      name: 'hansu'
    }, (err, result) => {
      if (err) throw err;
      console.log("连接成功");
    });

  });

  res.render("add", {});

});
*/