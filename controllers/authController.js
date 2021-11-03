const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

async function logIn(req, res) {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  console.log(userName, passWord);
  if (userName && passWord) {
    const user = await User.findOne({ userName: userName });
    console.log(user);
    if (user) {
      if (bcryptjs.compareSync(passWord, user.password)) {
        const token = jwt.sign({ userId: user._id, userName: user.userName }, process.env.SECRET);
        console.log("desde el backend: ", {
          token: token,
          userName: user.userName,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          userAvatar: user.avatarPic,
          id: user._id,
        });
        res.status(200).json({
          token: token,
          userName: user.userName,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          userAvatar: user.avatarPic,
          id: user._id,
        });
      } else {
        res.status(401).send("ERROR : datos invalidos");
      }
    } else {
      res.status(401).send("ERROR : datos invalidos");
    }
  } else {
    res.status(400).send("ERROR : datos incompletos");
  }
}

module.exports = {
  logIn,
};
