//This is the model for Friends Tweet stored in the MONGODB ATLAS
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
  login_user_Id: String,
  data: [mongoose.Schema.Types.Mixed],
});

const Friends = mongoose.model("friends", friendsSchema);

module.exports = Friends;
