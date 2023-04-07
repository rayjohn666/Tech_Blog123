const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
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

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});






module.exports = router;
