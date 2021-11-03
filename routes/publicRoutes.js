const express = require("express");
const checkJwt = require("express-jwt");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

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

publicRouter.post("/register", userController.register);

//publicRouter.get("/profile/:userName", isLoggedIn, pagesController.showProfile);
publicRouter.post("/login", authController.logIn);

publicRouter.get("/:userName", pagesController.showProfile);

publicRouter.get("/searchUsers", userController.searchUser);

publicRouter.post("/follow", userController.followToggle);

module.exports = publicRouter;
