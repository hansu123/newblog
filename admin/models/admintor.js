const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/test",{ useNewUrlParser: true });

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