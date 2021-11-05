const express = require("express");
const checkJwt = require("express-jwt");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");

publicRouter.get(
  "/tweets",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  pagesController.tweets,
);
publicRouter.post(
  "/tweets",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  tweetController.createTweet,
);

publicRouter.get(
  "/user",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  pagesController.user,
);
publicRouter.patch(
  "/user",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  userController.followToggle,
);

publicRouter.get(
  "/randomUsers",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  pagesController.randomUsers,
);

publicRouter.post("/login", authController.logIn);
publicRouter.post("/register", userController.register);

module.exports = publicRouter;
