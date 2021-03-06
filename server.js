const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routes/auth-routes");
const tweetRoutes = require("./routes/tweet-routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header
const path = require("path");

//serve static assets if in production

// connect to mongodb
mongoose.connect(
  keys.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // autoIndex: true,
  },
  () => {
    // run();
    console.log("connected to mongodb");
  }
);

//Middleware for Cookie Parser
app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "https://immense-badlands-87877.herokuapp.com/", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);
app.use("/tweets", tweetRoutes);

//serve static points in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));
