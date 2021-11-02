const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

async function logIn(req, res) {
  console.log(req.body);
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  if (userName && passWord) {
    const user = await User.findOne({ userName: userName, password: passWord });
    if (user) {
      console.log("Hay usuario!!!");
      console.log(user);
      const token = jwt.sign({ userName: user.userName }, "UnStringMuyScreto");
      res.json(token);
    } else {
      console.log("Erraste manito!!!!");
    }
  } else {
    console.log("te falta algo....");
  }
}

async function logOut(req, res) {
  req.logout();
  res.redirect("/index");
}

module.exports = {
  logIn,
  logOut,
};
