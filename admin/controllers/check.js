const mongoose=require("mongoose");


const Admintor=require("../models/admintor").AdmintorModel;


var checkAdmin={

isLog:function(req,res){

var $admin_name=req.body.aname;
var $admin_pwd=req.body.apwd;

Admintor.find({name:$admin_name},(err,result)=>{

if(result[0]){
if(result[0].password==$admin_pwd){ res.redirect("index");}
else{res.redirect("login");}

}

else{res.redirect("login");}

});

},

isReg:function(){}

};

module.exports=checkAdmin;