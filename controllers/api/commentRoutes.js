const express = require("express");
const { Comment, User } = require("../../models");
const router = express.Router();
const withAuth = require("../../utils/auth")




router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.session.userId)
    const comment = await Comment.create({
      ...req.body,
      userId: req.session.user_id,
    });
    console.log("COMMENT", comment);
res.json(comment);
  } catch (err) {
    console.log ("ERR", err);
    res.status(500).json(err);
  }
});

module.exports = router;

