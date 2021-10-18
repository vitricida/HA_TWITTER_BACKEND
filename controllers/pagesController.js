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
    //.populate("likes");
    //const users = await User.find().limit(4); //Error en esta línea
    //console.log(users);
    const users = await User.find({ _id: { $ne: req.user._id } });
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

    res.render("home", { homeTweets, thisUser, randomUsers });
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

    const users = await User.find({ _id: { $ne: req.user._id } });
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
    res.render("profile", { thisUser, profileTweets, randomUsers });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  showHome,
  showProfile,
  showIndex,
};
