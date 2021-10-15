//const { User, Tweet } = require("../models/index");
const { User, Tweet } = require("../models/index");

async function showIndex(req, res) {
  res.render("root");
}

// Muestra los Tweets de los following
async function showHome(req, res) {
  console.log(req.user);
  try {
    const thisUser = await User.findOne({ id: req.user.id });
    const homeTweets = await Tweet.find({ owner: { $in: [...req.user.following, req.user] } })
      .limit(20)
      .sort({ date: "desc" })
      .populate("owner");

    res.render("home", { homeTweets, thisUser });
  } catch (error) {
    console.log(error);
  }
}

//Muestra los Tweets del usuario
async function showProfile(req, res) {
  try {
    const thisUser = await User.findOne({ userName: req.params.userName });
    const profileTweets = await Tweet.find({ owner: { $in: [req.user] } })
      .limit(20)
      .sort({ date: "desc" })
      .populate("owner");
    res.render("profile", { thisUser, profileTweets });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  showHome,
  showProfile,
  showIndex,
};
