const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "https://immense-badlands-87877.herokuapp.com/";

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

  Friends.remove(
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
  res.redirect("https://immense-badlands-87877.herokuapp.com/");
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: "https://immense-badlands-87877.herokuapp.com/",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
