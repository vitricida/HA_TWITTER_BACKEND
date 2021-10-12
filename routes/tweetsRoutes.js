const express = require("express");
const tweetsRouter = express.Router();
const tweetController = require("../controllers/tweetController");

tweetsRouter.get("/tweet?:id", tweetController.showTweet);

module.exports = tweetsRouter;
