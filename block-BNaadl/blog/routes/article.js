var express = require("express");
const { NotExtended } = require("http-errors");
var router = express.Router();

var Article = require("../models/Article");

//List Articles
router.get("/", (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render("articles", { articles });
  });
});

//create article form
router.get("/new", (req, res) => {
  res.render("addArticle");
});

//fetch single article
router.get("/:id", (req, res) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("articleDetails", { article });
  });
});
//create Article
router.post("/", (req, res) => {
  req.body.tags = req.body.tags.trim().split(" ");
  Article.create(req.body, (err, createdArticle) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

//Edit
router.get("/:id/edit", (req, res) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    article.tags = article.tags.join(" ");
    if (err) return next(err);
    res.render("editArticleForm", { article });
  });
});
//Update article
router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  req.body.tags = req.body.tags.split(" ");
  Article.findByIdAndUpdate(id, req.body, (err, updateData) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

//delete
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/:id/likes", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});
router.get("/:id/Dislike", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { Dislike: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});
module.exports = router;
