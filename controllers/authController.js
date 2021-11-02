const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

async function logIn(req, res) {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  if (userName && passWord) {
    const user = await User.findOne({ userName: userName, password: passWord });
    if (user) {
      const token = jwt.sign({ userId: user._id, userName: user.userName }, process.env.SECRET);
      res.status(200).json(token);
    } else {
      res.status(401).send("error");
    }
  } else {
    res.status(400).send("error");
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
