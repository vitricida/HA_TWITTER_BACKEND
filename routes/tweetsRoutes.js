const express = require("express");
const tweetsRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const validateNewTweet = require("../middlewares/validateNewTweet");

const isLoggedIn = require("../middlewares/isLoggedIn");

tweetsRouter.get("/tweet?:id", isLoggedIn, tweetController.showTweet);
tweetsRouter.post("/tweet", isLoggedIn, validateNewTweet, tweetController.createTweet);

module.exports = tweetsRouter;
