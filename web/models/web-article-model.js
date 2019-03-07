var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/test",{ useNewUrlParser: true });



var Schema = mongoose.Schema;

var mySchema = new Schema({
    author: String,
    title: String,
    summary: String,
    cate: String,
    content: String,
    content_img: String,
    cover_img: String,
    n_like: Number,
    n_look: Number,
    n_comment: Number,
    postTime: String,
});

var Articles = mongoose.model('article', mySchema);



module.exports={ArticleModel:Articles};
