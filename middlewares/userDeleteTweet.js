const Tweet = require("../models/Tweet");

function userDeleteTweet(req, res, next) {
  if (req.user.userName === req.params.userName) {
    return next();
  } else {
    res.redirect("/profile/" + req.user.userName);
  }
}

module.exports = userDeleteTweet;
