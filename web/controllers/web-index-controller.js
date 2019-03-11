var mongoose = require('mongoose');

const Article = require("../models/web-article-model").ArticleModel;



var Articles = {

    index: function (req, res) {

        //promise经典用法，先获取总页数，在获取分页数

        let total = new Promise((resolve, reject) => {
            Article.find().exec((err, data) => {
                if (err) { throw err; }
                resolve(data.length);

            });
        });

        let getArticles = new Promise((resolve, reject) => {
            Article.find().skip(0).limit(3).exec((err, result) => {
                if (err) { throw err; }
                resolve(result);

            });
        });

        let latestArticles = new Promise((resolve, reject) => {
            Article.find().limit(4).sort({ postTime: -1 }).exec((err, result) => {
                if (err) { throw err; }

                resolve(result);

            });
        });

        let commendArticles = new Promise((resolve, reject) => {
            Article.find().limit(5).sort({ n_like: -1 }).exec((err, result) => {
                if (err) { throw err; }

                resolve(result);

            });
        });




        Promise.all([total, getArticles, latestArticles, commendArticles]).then(([data, result1, result2, result3]) => {


            res.render("index", { total: data, article: result1, latest: result2, commend: result3, prevpage: -1, nextpage: 1 });

        })



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


            let total = new Promise((resolve, reject) => {
                Article.find().exec((err, data) => {
                    if (err) { throw err; }
                    resolve(data.length);
    
                });
            });


            let latestArticles = new Promise((resolve, reject) => {
                Article.find().limit(4).sort({ postTime: -1 }).exec((err, result) => {
                    if (err) { throw err; }
    
                    resolve(result);
    
                });
            });

            let commendArticles = new Promise((resolve, reject) => {
                Article.find().limit(5).sort({ n_like: -1 }).exec((err, result) => {
                    if (err) { throw err; }
    
                    resolve(result);
    
                });
            });

            let getPage=new Promise((resolve, reject) => {
                    Article.find().skip($page * 3).limit(3).exec((err, result) => {
                        if (err) { throw err; }
                        resolve(result);
                    });
                });
           
                Promise.all([total, latestArticles, commendArticles,getPage]).then(([data, result1, result2, result3]) => {


                    res.render("index", {  total: data,latest: result1, commend: result2,article: result3, prevpage: $page - 1, nextpage: $page + 1 });
                });
        
               




        }
    },

    search: function (req, res) {

        let $kword = req.query.kword || 0;
        if ($kword == null) {
            res.redirect('./index');
        }
        else {
            const reg = new RegExp($kword, 'i');

            Article.find({
                $or: [ //多条件，数组
                    { cate: { $regex: reg } },
                    { summary: { $regex: reg } }
                ]
            }).exec((err, result) => {
                if (err) { throw err; }

                if (result.length > 0) {
                    res.render("search", { article: result, kword: $kword, total: result.length })
                }
                else {

                    Article.find({ cate: "JS" }).limit(3).exec((err, data) => {

                        res.render("noresult", { article: data, kword: $kword })

                    })


                }


            });

        }

    }



}





module.exports = Articles;