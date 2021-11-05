const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function showTweet(req, res) {
  const tweet = req.query.id;
  res.send("Voy a mostrar el tweet con ID : " + tweet + ".");
}

//tweet
async function createTweet(req, res) {
  //console.log("ACA EL CONTENT del CreateTweet: ", req.body);
  //console.log(req.user);
  if (req.body.content !== "") {
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
  } else {
    res.status(401).send("error : empty body");
  }
}
//like
async function like(req, res) {
  //console.log(req.body);
  try {
    const user = await User.findOne({ _id: req.body.owner._id });
    const tweet = await Tweet.findOne({ _id: req.body._id });
    const found = tweet.likes.find((element) => String(element) === String(req.body.owner._id));
    if (found) {
      console.log("lo tengo que sacar");
      await tweet.likes.pull(user);
      tweet.save();
      res.json();
    } else {
      console.log("lo tengo que agregar");
      await tweet.likes.push(user);
      tweet.save();
      res.json();
    }
  } catch (error) {
    console.log(error);
    const errores = {
      mensaje: error,
    };
    res.status(404).json(errores);
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
  like,
  deleteTweet,
};
