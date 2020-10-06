// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const friendsSchema = new Schema({
//     login_user_Id: String,
//     // data: Array

//     data: [
//         {
//             type: Object,
//             content: Schema.Types.Mixed
//         }
//     ]

// });

// const Friendss = mongoose.model("friends", friendsSchema);

// module.exports = Friendss;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
  login_user_Id: String,
  data: [mongoose.Schema.Types.Mixed],
});

const Friends = mongoose.model("friends", friendsSchema);

module.exports = Friends;
