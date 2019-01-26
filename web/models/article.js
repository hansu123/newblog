var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/local", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});



var Schema = mongoose.Schema;

var mySchema = new Schema({
  author: String,
  title: String,
  content: String,
});

var Articles = mongoose.model('article', mySchema);



module.exports={ArticleModel:Articles};
