const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

async function logIn(req, res) {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  if (userName) {
    const user = await User.findOne({ userName: userName });
    if (bcryptjs.compareSync(passWord, user.password)) {
      const token = jwt.sign({ userId: user._id, userName: user.userName }, process.env.SECRET);
      res.status(200).json({ token, id: user._id, userName: user.userName });
    } else {
      res.status(401).send("ERROR : datos invalidos");
    }
  } else {
    res.status(400).send("ERROR : datos incompletos");
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
