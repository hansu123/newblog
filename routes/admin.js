const express=require("express");
const router=express.Router();

const admin=require("../admin/controllers/admin");

const checkAdmin=require("../admin/controllers/check");

const articleController=require("../admin/controllers/article");


router.get("/index",(req,res)=>{
    res.render("index",{});
});
    
    
router.get("/login",(req,res)=>{
    res.render("login",{});
});




router.post("/admin",checkAdmin.isLog);




/*welcome首页接口*/
router.get("/welcome",(req,res)=>{
    res.render("welcome",{});
});


/*管理员接口*/
router.get("/adminList",admin.AdmintorList);



/*文章列表接口*/
router.get("/articleList",articleController.List);

router.get("/articleAdd",(req,res)=>{
    res.render("articleAdd");
});




//文章上传接口
const multer=require("multer");
const path=require("path");
const upload=multer({dest:"static/upload"});







router.post("/add",upload.single("img"),articleController.Add);




//用户作者接口

router.get("/userList",(req,res)=>{

    res.render("userList",{});
});



module.exports=router;