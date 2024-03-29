const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const router = express.Router();
// make sure to use this format  for const router
const bcrypt = require("bcrypt");
var session = require("express-session");

router.get("/", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup", { layout: "main", logged_in: req.session.logged_in });
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "main", logged_in: req.session.logged_in });
});

router.get("/comments", (req, res) => {
  res.render("comments", { layout: "main", logged_in: req.session.logged_in });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { layout: "main", logged_in: req.session.logged_in });
});




  router.get('/home', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [User],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('home', { 
        posts,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/comments', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [User],
      });
      // serialize the data
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      console.log(commentData, Comment);
      console.log(comments);
  
      res.render("comments", {
        layout: "main",
        logged_in: req.session.logged_in,
        comments,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  

module.exports = router;
