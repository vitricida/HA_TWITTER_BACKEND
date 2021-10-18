//const { User, Tweet } = require("../models/index");
const { User, Tweet } = require("../models/index");

async function showIndex(req, res) {
  res.render("root");
}

/*async function showProfile(req, res) {
  const user = await User.findById(req.user._id);
  const users = await User.find({ _id: { $ne: req.user._id } });
  const ids = [];
  for (member of users) ids.push(member._id);
  const shuffled = ids.sort(function () {
    return 0.5 - Math.random();
  });
  const selected = shuffled.slice(0, 3);
  const randomUsers = [];

  for (id of selected) {
    const user = await User.findById(id);
    randomUsers.push(user);
  }
  

  res.render("profile", { user, randomUsers });
}
*/

//Mostar Usuarios
async function showUser(req, res) {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    console.log(users);

    res.render("users", { users });
  } catch (error) {
    console.log(error);
  }
}

// Muestra los Tweets de los following
async function showHome(req, res) {
  //console.log(req.user);
  try {
    const user = await User.findById(req.user._id);
    const users = await User.find({ _id: { $ne: req.user._id } });
    const thisUser = await User.findOne({ id: req.user.id });
    const homeTweets = await Tweet.find({ owner: { $in: [...req.user.following, req.user] } })
      .limit(20)
      .sort({ date: "desc" })
      .populate("owner");
    //.populate("likes");
    const ids = [];
    for (member of users) ids.push(member._id);
    const shuffled = ids.sort(function () {
      return 0.5 - Math.random();
    });
    const selected = shuffled.slice(0, 3);
    const randomUsers = [];
    for (id of selected) {
      const user = await User.findById(id);
      randomUsers.push(user);
    }

    //const users = await User.find().limit(4); //Error en esta línea
    console.log(randomUsers);

    res.render("home", { homeTweets, thisUser, users, randomUsers });
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
  showUser,
};
