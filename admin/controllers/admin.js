const mongoose=require("mongoose");


const Admintor=require("../models/admintor").AdmintorModel;


var Admin={

AdmintorList:function(req,res){

Admintor.find((err,result)=>{

if(err) throw err;

res.render("adminList",{admintors:result});

});

}

};

module.exports=Admin;