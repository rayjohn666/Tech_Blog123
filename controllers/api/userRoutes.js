const { User, Comment, Post } = require("../../models");
const router = require("express").Router();
// make sure to use this format  for const router
const bcrypt = require("bcrypt");
var session = require("express-session");

// router.get("/", (req, res) => {
//   User.findAll({
//     include: [Post, Comment],
//   })
//     .then((dbUser) => {
//       res.json(dbUser);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get("/signup", (req, res) => {
//   res.render("signup", { layout: "main", logged_in: req.session.logged_in });
// });

// router.post("/login", (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username,
//     },
//   }).then((username) => {
//     res.json(username);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });

// router.get("/disclaimer", (req, res) => {
//   res.render("disclaimer", {
//     layout: "main",
//     logged_in: req.session.logged_in,
//   });
// });


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
    console.log(req.session)
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const dbUserData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.logged_in = true;

//       res.render("homepage", {
//         layout: "main",
//         logged_in: req.session.logged_in,
//       });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.post("/login", async (req, res) => {
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

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.render("homepage", { layout: "main", logged_in: false });
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
