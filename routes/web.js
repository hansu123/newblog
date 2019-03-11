const express = require("express");

const router = express.Router();


const Article = require("../web/controllers/web-index-controller.js");



//首页接口
router.get("/index", Article.index);



//文章详情接口
router.get("/detail", Article.detail);




//文章分页接口
router.get("/article", Article.article);


//文章查询接口
router.get("/search", Article.search);


//留言板


router.get("/message", (req, res) => {

    res.render("message");
});



router.get("/tool", (req, res) => {

    res.render("tool");
});

router.get("/demo", (req, res) => {

    res.render("demo");
});




module.exports = router;