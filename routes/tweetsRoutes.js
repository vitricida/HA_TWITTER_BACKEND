const express = require("express");
const tweetsRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const validateNewTweet = require("../middlewares/validateNewTweet");
const userDeleteTweet = require("../middlewares/userDeleteTweet");

const isLoggedIn = require("../middlewares/isLoggedIn");

tweetsRouter.get("/tweet?:id", isLoggedIn, tweetController.showTweet);
//tweet route
/* tweetsRouter.post("/tweet", tweetController.createTweet); */
//like
tweetsRouter.post("/like", tweetController.like);

tweetsRouter.get("/profile/:userName/deleteTweet:id", userDeleteTweet, tweetController.deleteTweet);

module.exports = tweetsRouter;
