var mongoose = require('mongoose');

const Article = require("../models/web-article-model").ArticleModel;



var Articles = {

    index: function (req, res) {

        //promise经典用法，先获取总页数，在获取分页数

        let total = function () {

            return new Promise((resolve, reject) => {
                Article.find().exec((err, data) => {
                    if (err) { throw err; }
                    resolve(data.length);

                });
            });
        }
        let getArticles = function (data) {
            return new Promise((resolve, reject) => {
                Article.find().skip(0).limit(3).exec((err, result) => {
                    if (err) { throw err; }
                    res.render("index", { article: result, prevpage: -1, nextpage: 1, total: data });

                });
            });

        }

        total().then(getArticles);



    },

    detail: function (req, res) {

        var ObjectId = mongoose.Types.ObjectId;
        var $id = ObjectId(req.query.id);

        Article.find({ _id: $id }, (err, result) => {
            if (err) { res.status(404).send("您的文章找不到").end(); };

            res.detail = result;
            res.render("detail", { detail: res.detail })

        });




    },

    article: function (req, res) {

        let $page = Number(req.query.page) || 0;
        if ($page == 0) {
            res.redirect('./index');
        }
        else {
            let total = function () {
                return new Promise((resolve, reject) => {
                    Article.find().exec((err, data) => {
                        if (err) { throw err; }
                        resolve(data.length)

                    });
                })
            }
            let getPage = function (data) {
                return new Promise((resolve, reject) => {
                    Article.find().skip($page * 3).limit(3).exec((err, result) => {
                       if (err) { throw err; }
                        res.render("index", { article: result, prevpage: $page - 1, nextpage: $page + 1, total: data });
                    });
                })
            }
            total().then(getPage);
        }
    },

    search: function (req, res) {

        let $kword = req.query.kword || 0;
        if ($kword==null) {
            res.redirect('./index');
        }
        else {
           
                    Article.find({cate:$kword}).exec((err, result) => {
                        if (err) { throw err; }
                       console.log(result);
                        if(result.length>0){
                            res.render("search",{article:result,kword:$kword,total:result.length})
                        }
                        else{
                            
                            Article.find({cate:"JS"}).limit(3).exec((err, data) => {
                                
                                res.render("noresult",{article:data,kword:$kword})

                            })

                         
                        }
                 

                    });
               
            }
            
        }
    


}





module.exports = Articles;