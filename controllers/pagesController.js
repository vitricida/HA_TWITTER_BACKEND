//const { User, Tweet } = require("../models/index");
const { User, Tweet } = require("../models/index");
/* 
async function showHome(req, res) {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]],
    include: [User, Comment],
  });
  console.log(articles);
  res.render("home", { articles });
} */
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
async function showMyProfile(req, res) {
  res.render("profile");
}
async function showProfile(req, res) {
  const user = req.query.id;
  res.send("Esto es el perfil de " + user + ".");
}

module.exports = {
  showLogin,
  showRegister,
  showHome,
  showMyProfile,
  showProfile,
  showIndex,
};
