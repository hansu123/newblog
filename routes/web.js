const express=require("express");


const router=express.Router();


const Article=require("../web/controllers/index.js");




router.get("/index",Article.index);










module.exports=router;