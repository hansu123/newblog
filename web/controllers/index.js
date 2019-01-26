var mongoose = require('mongoose');

const Article=require("../models/article").ArticleModel;



var Articles={

index:function(req,res){
Article.find((err,result)=>{
if(err){throw err;}

res.render("index",{article:result});

});



}



}





module.exports=Articles;