/* const { User } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]],
    include: [User, Comment],
  });
  console.log(articles);
  res.render("home", { articles });
} */
async function showLogin(req, res) {
  res.send("Esto es el Login.");
}
async function showRegister(req, res) {
  res.send("Esto es el Login.");
}

async function showHome(req, res) {
  res.send("Esto es el home.");
}
async function showMyProfile(req, res) {
  res.send("Esto es My Profile.");
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
};
