const router = require("express").Router();

const Friends = require("../models/friends-model");
router.get("/", async (req, res) => {
  try {
    let tweetlist = [];
    tweetlist = await Friends.find({
      login_user_Id: req.user.screenName,
    }).limit(1);

    res.json(tweetlist[0].data);
    // console.log(tweetlist[0].data);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
