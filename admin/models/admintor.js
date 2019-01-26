const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/admin");

var Schema = mongoose.Schema;

var mySchema = new Schema({
  name: String,
  sex: String,
  phone: String,
  email: String,
  password: String,

});

var Admintors = mongoose.model('admintor', mySchema);



module.exports={AdmintorModel:Admintors};