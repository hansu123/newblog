const ArticleModel=require("../models/articles");
const fs=require("fs");


module.exports={

List:function(req,res){

ArticleModel.find({},(err,result)=>{

    if(err)throw err;
    res.render("articleList",{articleList:result});
});

},

Add:function(req,res){

 

    //获取上传时间作为图片后缀名不易重复
    var imgNameArr=req.file.originalname.split(".");
    var imgFileName=imgNameArr[0]+Date.now()+"."+imgNameArr[(imgNameArr.length-1)];
    
    //修改新路径
    var pathname="static/upload/"+imgFileName;
    fs.renameSync(req.file.path,pathname,(err)=>{if(err);throw err;});
    //renameSync(原路径，新路径,callback)
   
    var postTime=new Date();

   
    console.log(req.body);
    
    ArticleModel.create({

        author: req.body.author,
        title: req.body.title,
        summary: req.body.summary,
        cate :req.body.cate,
        content: req.body.content,
        cover_img: imgFileName,
        n_like: 0,
        n_look: 0,
        n_comment: 0,
        postTime: postTime.toLocaleString(),

    },(err,result)=>{

        if(err)throw err;

  

    })
    
    }




}




