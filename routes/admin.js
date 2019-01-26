const express=require("express");
const router=express.Router();


router.get("/index",(req,res)=>{
    res.render("index",{});
});
    
    
router.get("/login",(req,res)=>{

    res.render("login",{});
});


const admin=require("../admin/controllers/admin");

const checkAdmin=require("../admin/controllers/check");

router.post("/admin",checkAdmin.isLog);


router.get("/adminList",admin.AdmintorList);


router.get("/welcome",(req,res)=>{
    res.render("welcome",{});
});







module.exports=router;