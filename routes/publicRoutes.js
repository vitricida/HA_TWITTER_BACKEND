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
  "/home",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  pagesController.showHome,
);
//publicRouter.get("/index", redirectToHomeIfLoggedIn, pagesController.showIndex);
publicRouter.get("/", function (req, res) {
  res.redirect("home");
});

//publicRouter.get("/profile/:userName", isLoggedIn, pagesController.showProfile);
publicRouter.post("/login", authController.logIn);

publicRouter.get("/:userName", pagesController.showProfile);
publicRouter.get("/logout", authController.logOut);

publicRouter.post("/register", validateRegistrationData, userController.register);
publicRouter.get("/searchUsers", userController.searchUser);

publicRouter.post("/follow", userController.followToggle);

module.exports = publicRouter;
