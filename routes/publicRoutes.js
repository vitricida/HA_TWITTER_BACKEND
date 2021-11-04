const express = require("express");
const checkJwt = require("express-jwt");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");

const validateRegistrationData = require("../middlewares/validateRegistrationData");
const redirectToHomeIfLoggedIn = require("../middlewares/redirectToHomeIfLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

//publicRouter.get("/users", pagesController.showUser);

//publicRouter.get("/home", isLoggedIn, pagesController.showHome);
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

publicRouter.get(
  "/randomUsers",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  pagesController.randomUsers,
);

//publicRouter.get("/profile/:userName", isLoggedIn, pagesController.showProfile);
publicRouter.post("/login", authController.logIn);
publicRouter.post("/register", userController.register);
publicRouter.get("/:userName", pagesController.showProfile);

//publicRouter.post("/register", validateRegistrationData, userController.register);
publicRouter.get("/searchUsers", userController.searchUser);

publicRouter.post("/follow", userController.followToggle);

module.exports = publicRouter;
