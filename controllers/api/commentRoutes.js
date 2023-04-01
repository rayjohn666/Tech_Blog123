const express = require("express");
const Comment = require("../../models");
// const router = express.Router();
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });
    // serialize the data
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);

    res.render("comments", {
        layout: "main",
        logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.render("comments", {
      layout: "main",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
