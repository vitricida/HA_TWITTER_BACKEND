const Tweet = require("../models/Tweet");

async function showTweet(req, res) {
  const tweet = req.query.id;
  res.send("Voy a mostrar el tweet con ID : " + tweet + ".");
}

async function createTweet(req, res) {
  try {
    const newTweet = await Tweet.create({
      content: req.body.tweetContent,
      owner: req.user.id,
      likes: [],
      date: new Date(),
    });
    console.log(newTweet);
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  showTweet,
  createTweet,
};
