const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  content: String,
  date: Date,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Tweet", tweetSchema);
