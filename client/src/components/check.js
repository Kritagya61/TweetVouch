// const passport = require("passport");
// const TwitterStrategy = require("passport-twitter");
// const keys = require("./keys");
// const User = require("../models/user-model");
// var Twit = require('twit');
// const Friendss = require("../models/friends-model");
// const moment = require("moment");
// // serialize the user.id to save in the cookie session
// // so the browser will remember the user when login
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // deserialize the cookieUserId to user in the database
// passport.deserializeUser((id, done) => {
//     User.findById(id)
//         .then(user => {
//             done(null, user);
//         })
//         .catch(e => {
//             done(new Error("Failed to deserialize an user"));
//         });
// });

// passport.use(
//     new TwitterStrategy(
//         {
//             consumerKey: keys.TWITTER_CONSUMER_KEY,
//             consumerSecret: keys.TWITTER_CONSUMER_SECRET,
//             callbackURL: "/auth/twitter/redirect"
//         },
//         async (token, tokenSecret, profile, done) => {
//             // find current user in UserModel
//             const currentUser = await User.findOne({
//                 twitterId: profile._json.id_str
//             });
//             // console.log(profile);
//             var T = new Twit({
//                 consumer_key: 'Twy1vHuAqFEedvOT603Lb6zoe',
//                 consumer_secret: 'w1JSQxso97e9BJJwgsy6uv7583R9ikAmmJpHUCye8PhIVIDL2r',
//                 access_token: token,
//                 access_token_secret: tokenSecret,
//                 timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
//                 strictSSL: true,     // optional - requires SSL certificates to be valid.
//             })
//             var tweets = [];
//             T.get('friends/list', { user_id: profile._json.id_str, count: 10 }, function (err, data1, response) {
//                 // console.log(typeof (data.users));
//                 // console.log(data.users.length);
//                 var l = data1.users.length;
//                 // console.log(l)
//                 for (var i = 0; i < l; i++) {
//                     var obj = data1.users[i].id_str;

//                     T.get('statuses/user_timeline', { user_id: obj, count: 3 }, async function (err, data, response) {
//                         for (var j = 0; j < data.length; j++) {
//                             var date = moment(data[j].created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');

//                             var date1 = new Date();
//                             var date2 = moment(date1, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
//                             var diff = date2.diff(date, 'days');
//                             // console.log(diff)

//                             if (diff <= 7) {
//                                 // console.log("hello00000000000 " + data[j].created_at);
//                                 tweets.push(data[j]);

//                             }

//                         }
//                         console.log(tweets.length + "tweet length");

//                         if (tweets.length > 0 && i === l) {
//                             console.log("hezkjbakjcbakjcbskjcbjkcb");
//                             const friend = await new Friendss({
//                                 login_user_Id: profile._json.name,
//                                 data: tweets
//                             }).save();
//                             if (friend) {
//                                 done(null, friend);
//                             }
//                         }

//                     })

//                 }
//             }
//             )

//             // create new user if the database doesn't have this user
//             if (!currentUser) {
//                 const newUser = await new User({
//                     name: profile._json.name,
//                     screenName: profile._json.screen_name,
//                     twitterId: profile._json.id_str,
//                     profileImageUrl: profile._json.profile_image_url
//                 }).save();
//                 if (newUser) {
//                     done(null, newUser);
//                 }
//             }
//             done(null, currentUser);
//         }
//     )
// );

//     fetch("http://localhost:5000/auth/login/success", {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Credentials": true
//         }
//     })
//         .then(response => {
//             if (response.status === 200) return response.json();
//             throw new Error("failed to authenticate user");
//         })
//         .then(responseJson => {
//             this.setState({
//                 authenticated: true,
//                 user: responseJson.user
//             });
//         })
//         .catch(error => {
//             this.setState({
//                 authenticated: false,
//                 error: "Failed to authenticate user"
//             });
//         });

// static propTypes = {
//     user: PropTypes.shape({
//         name: PropTypes.string,
//         profileImageUrl: PropTypes.string,
//         twitterId: PropTypes.string,
//         screenName: PropTypes.string,
//         _id: PropTypes.string
//     })
// };

{
  /* <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.props.user}
          </Link>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <button
              className="dropdown-item"
              style={{
                cursor: "pointer",
              }}
              onClick={this._handleLogoutClick}
            >
              Logout
            </button>
          </div>
        </li> */
}
