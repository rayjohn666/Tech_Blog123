const express = require("express");
const User = require("../models/User");
const router = express.Router();
// make sure to use this format  for const router
const bcrypt = require("bcrypt");
var session = require("express-session");

// router.get('/', (req, res) =>{
//     res.render('login')
// });
router.get("/signup", (req, res) => {
  res.render("signup", { layout: "main", logged_in: req.session.logged_in });
});

router.get("/login", (req, res) => {
  res.render("login", { layout: "main", logged_in: req.session.logged_in });
});

router.get("/disclaimer", (req, res) => {
  res.render("disclaimer", {
    layout: "main",
    logged_in: req.session.logged_in,
  });
});

router.post("/api/users", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;

      res.render("homepage", {
        layout: "main",
        logged_in: req.session.logged_in,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/api/users/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;

      res.render("homepage", {
        layout: "main",
        logged_in: req.session.logged_in,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/api/users/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.render("homepage", { layout: "main", logged_in: false });
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
