const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const keys = require("./keys");
const User = require("../models/user-model");
var Twit = require("twit");
const Friends = require("../models/friends-model");
const moment = require("moment");
// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      callbackURL:
        "https://immense-badlands-87877.herokuapp.com/" +
        "/auth/twitter/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        twitterId: profile._json.id_str,
      });
      var T = new Twit({
        consumer_key: "Twy1vHuAqFEedvOT603Lb6zoe",
        consumer_secret: "w1JSQxso97e9BJJwgsy6uv7583R9ikAmmJpHUCye8PhIVIDL2r",
        access_token: token,
        access_token_secret: tokenSecret,
        timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
        strictSSL: true, // optional - requires SSL certificates to be valid.
      });
      var tweets = [];
      // T.get(
      //   "friends/ids",
      //   { user_id: profile._json.id_str, stringify_ids: true, count: 150 },
      //   function (err, data1, response) {
      //     data1.ids.push(profile._json.id_str);
      //     var l = data1.ids.length;

      //     var incrementer = 0;
      //     for (var i = 0; i < l; i++) {
      //       var obj = data1.ids[i];

      T.get("statuses/home_timeline", { count: 1000 }, async function (
        err,
        data,
        response
      ) {
        // console.log(data);
        // incrementer++;
        for (var j = 0; j < data.length; j++) {
          var date = moment(
            data[j].created_at,
            "dd MMM DD HH:mm:ss ZZ YYYY",
            "en"
          );

          var date1 = new Date();
          var date2 = moment(date1, "dd MMM DD HH:mm:ss ZZ YYYY", "en");
          var diff = date2.diff(date, "days");
          if (diff <= 7) {
            console.log("Count checkkk");
            tweets.push(data[j]);
          }
        }
        // if (tweets.length > 0 && incrementer === i) {
        //   if (tweets.length <= 1000) {
        //     new Friends({
        //       login_user_Id: profile._json.name,
        //       data: tweets,
        //     }).save();
        //   } else {
        //     for (var u = 0; u < tweets.length; u = u + 1000) {
        //       var temp = tweets.slice(u, u + 1000);
        //       new Friends({
        //         login_user_Id: profile._json.name,
        //         data: temp,
        //       }).save();
        //     }
        //   }
        // }
        if (tweets.length > 0) {
          await new Friends({
            login_user_Id: profile._json.screen_name,
            data: tweets,
          }).save();
        }
      });
      //     }
      //   }
      // );

      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url,
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);
