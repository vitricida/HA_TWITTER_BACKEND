const { User, Tweet } = require("../models/index");

async function showIndex(req, res) {
  res.render("root");
}
async function tweets(req, res) {
  try {
    const thisUser = await User.findById(req.user.userId);
    const homeTweets = await Tweet.find({ owner: { $in: [...thisUser.following, thisUser] } })
      .limit(20)
      .sort({ date: "desc" })
      .populate("owner");
    res.status(200).json({ thisUser, homeTweets });
  } catch (error) {
    console.log(error);
  }
}
// Muestra los Tweets de los following
/* async function showHome(req, res) {
  try {
    const thisUser = await User.findOne({ _id: req.user.userId });
    console.log("ESTE ES EL CONSOLE LOG : ", req.user);
    const homeTweets = await Tweet.find({ owner: { $in: [...thisUser.following, thisUser] } })
      .limit(20)
      .sort({ date: "desc" })
      .populate("owner");
    const users = await User.find({ _id: { $ne: thisUser._id } });
    const ids = [];
    for (member of users) ids.push(member._id);
    const shuffled = ids.sort(function () {
      return 0.5 - Math.random();
    });
    const selected = shuffled.slice(0, 4);
    const randomUsers = [];

    for (id of selected) {
      const user = await User.findById(id);
      randomUsers.push(user);
    }

    res.json({ homeTweets, thisUser, randomUsers });
  } catch (error) {
    console.log(error);
  }
} */

//Muestra los Tweets del usuario
async function showProfile(req, res) {
  console.log("entre a profile");
  try {
    const thisUser = await User.findOne({ userName: req.params.userName });
    const profileTweets = await Tweet.find({ owner: { $in: [thisUser] } })
      .limit(20)
      .sort({ date: "desc" })
      .populate("owner");

    const users = await User.find({ _id: { $ne: thisUser._id } });
    const ids = [];
    for (member of users) ids.push(member._id);
    const shuffled = ids.sort(function () {
      return 0.5 - Math.random();
    });
    const selected = shuffled.slice(0, 4);
    const randomUsers = [];

    for (id of selected) {
      const user = await User.findById(id);
      randomUsers.push(user);
    }
    res.json({ thisUser, profileTweets, randomUsers });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  tweets,
  showProfile,
  showIndex,
};
