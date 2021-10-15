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

// Cara los Tweets de los following
async function showHome(req, res) {
  console.log(req.user);
  try {
    const homeTweets = await Tweet.find({ owner: { $in: [...req.user.following] } })
      .limit(20)
      .sort("date")
      .populate("owner");

    res.render("home", { homeTweets });
  } catch (error) {
    console.log(error);
  }
}
<<<<<<< HEAD

// Cara Los Tweets del User logeado
async function showMyProfile(req, res) {
  try {
    const homeTweets = await Tweet.find({ owner: { $in: [req.user] } })
      .limit(20)
      .sort("date")
      .populate("owner");

    res.render("profile", { homeTweets });
  } catch (error) {
    console.log(error);
  }
}

=======
>>>>>>> 1e9b9b8db305a31d85c49bc97532d8a4f26ce104
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
