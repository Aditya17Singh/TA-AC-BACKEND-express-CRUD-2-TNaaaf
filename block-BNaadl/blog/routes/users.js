var express = require("express");
var router = express.Router();
var form = require("../model/Article");

//user form
router.get("/new", (req, res) => {
  res.render("form");
});

//post request
router.post("/", (req, res, next) => {
  form.create(req.body, (err, createdform) => {
    console.log(req.body);
    if (err) return next(err);
    res.redirect("/users/listArticle");
  });
});
router.get("/listArticle", (req, res) => {
  //fetch all users from databse
  form.find({}, (err, users) => {
    if (err) return next(err);
    res.render("listArticle", { users: users });
  });
});

module.exports = router;
