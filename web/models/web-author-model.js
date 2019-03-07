var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/test",{ useNewUrlParser: true });



var Schema = mongoose.Schema;

var mySchema = new Schema({
   name: String,
   grader: String,
   authorImg: String,
});

var Authors = mongoose.model('authors', mySchema);



module.exports={AuthorModel:Authors};
