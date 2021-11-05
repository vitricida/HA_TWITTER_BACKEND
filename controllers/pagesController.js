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
    res.status(200).json(homeTweets);
  } catch (error) {
    console.log(error);
  }
}
async function user(req, res) {
  try {
    console.log(req.query.userName);
    if (req.query.userName) {
      console.log("USUARIO POR BODY!!!!");
      const thisUser = await User.findOne({ userName: req.query.userName });
      console.log(thisUser);
      res.status(200).json(thisUser);
    } else {
      console.log("USUARIO POR JWT!!!!");
      const thisUser = await User.findById(req.user.userId);
      console.log(thisUser);
      res.status(200).json(thisUser);
    }
  } catch (error) {
    console.log(error);
  }
}

async function randomUsers(req, res) {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } });
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
    res.status(200).json(randomUsers);
  } catch (error) {
    console.log(error);
  }
}

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
  user,
  randomUsers,
  showProfile,
  showIndex,
};
