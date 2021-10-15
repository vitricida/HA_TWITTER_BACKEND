const express = require("express");
const tweetsRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const validateNewTweet = require("../middlewares/validateNewTweet");

tweetsRouter.get("/tweet?:id", tweetController.showTweet);
tweetsRouter.post("/tweet", validateNewTweet, tweetController.createTweet);

module.exports = tweetsRouter;
