const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    dob: Date,
    password: String,
    bio: String,
    avatarPic: String,
    profilePic: String,
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
