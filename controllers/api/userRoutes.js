const { User, Comment, Post } = require("../../models");
const router = require("express").Router();
const bcrypt = require("bcrypt");
var session = require("express-session");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      //include: [Comment, Post ]
    });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const dbUserData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

    // res.render("comments", { layout: "main", logged_in: req.session.logged_in });
//     req.session.save(() => {
//       req.session.logged_in = true;
//       req.session.user_id = dbUserData.id;

//       res.render("comments", {
//         layout: "main",
//         logged_in: req.session.logged_in,
//       });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
    console.log(req.session);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login1", async (req, res) => {
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



router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN:", req.body);
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
    console.log("validPassword",validPassword)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }
   // req.session.user=req.body.email;
   


    req.session.save(() => {
      req.session.logged_in = true;

      res.send({ok:true})
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  console.log("LOGOUT", req.session.logged_in);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      console.log("DESTROYED")
      res.send({ok:true})
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;