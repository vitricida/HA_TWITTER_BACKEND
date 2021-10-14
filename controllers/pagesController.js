//const { User, Tweet } = require("../models/index");
const { User, Tweet } = require("../models/index");

async function showLogin(req, res) {
  res.render("login");
}
async function showIndex(req, res) {
  res.render("root");
}
async function showRegister(req, res) {
  res.send("Esto es el Login.");
}

async function showHome(req, res) {
  console.log(req.user);
  try {
    const homeTweets = await Tweet.find({}).limit(10).sort("date").populate("owner");
    res.render("home", { homeTweets });
  } catch (error) {
    console.log(error);
  }
}
async function showProfile(req, res) {
  const thisUser = await User.findOne({ userName: req.params.userName });

  res.render("profile", { thisUser });
}

module.exports = {
  showLogin,
  showRegister,
  showHome,
  showProfile,
  showIndex,
};
