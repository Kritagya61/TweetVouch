const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

const mongo = require("mongodb");
const Friends = require("../models/friends-model");
// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({
      error: new Error("Authentication Error"),
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  console.log(req.user);

  Friends.deleteMany(
    {
      login_user_Id: req.user.ScreenName,
      //check
    },
    function (err, result) {
      if (err) {
        console.err(err);
      } else {
        console.log(result);
      }
    }
  );

  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;

// const router = require("express").Router();
// const Item = require("../models/Item");

// router.get('/', (req, res) => {
//     Item.find()
//         .sort({ date: -1 })
//         .then(items => res.json(items))
// })

// router.post('/', (req, res) => {
//     const newItem = new Item({
//         name: req.body.name
//     });
//     newItem.save().then(item => res.json(item));
// });

// router.delete('/:id', (req, res) => {
//     Item.findById(req.params.id)
//         .then(item => item.remove().then(() => { res.json({ success: true }) }))
//         .catch(err => res.status(404).json({ success: false }));
// });

// module.exports = router;
