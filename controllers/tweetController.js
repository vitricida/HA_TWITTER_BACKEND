const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function showTweet(req, res) {
  const tweet = req.query.id;
  res.send("Voy a mostrar el tweet con ID : " + tweet + ".");
}

//tweet
async function createTweet(req, res) {
  //console.log("ACA EL CONTENT del CreateTweet: ", req.body);
  console.log(req.user);
  try {
    const newTweet = await Tweet.create({
      content: req.body.content,
      owner: req.user.userId,
      likes: [],
      date: new Date(),
    });
    res.status(200).json(newTweet);
  } catch (error) {
    console.log(error);
    const errores = {
      mensaje: error,
    };
    res.status(404).json(errores);
    //res.status(404).render("error", errores);
  }
}

async function likeToggle(req, res) {
  try {
    const user = await User.findOne({ _id: req.body.user });
    const tweet = await Tweet.findOne({ _id: req.body.tweet });
    const found = tweet.likes.find((element) => String(element) === String(user._id));
    if (found) {
      await tweet.likes.pull(user);
      await tweet.save();
      res.redirect("home");
    } else {
      await tweet.likes.push(user);
      await tweet.save();
      res.redirect("home");
    }
  } catch (error) {
    console.log(error);
    const errores = {
      mensaje: error,
    };
    res.status(404).send(errores);
    //res.status(404).render("error", errores);
  }
}

async function deleteTweet(req, res) {
  const tweet = await Tweet.deleteOne({
    _id: req.params.id,
  });
  res.redirect("/profile/" + req.user.userName);
}

module.exports = {
  showTweet,
  createTweet,
  likeToggle,
  deleteTweet,
};
