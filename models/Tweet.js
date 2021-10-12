const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  content: String,
  date: Date,
  lastName: String,
  likes: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Tweet", tweetSchema);
