const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const validateRegistrationData = require("../middlewares/validateRegistrationData");
const redirectToHomeIfLoggedIn = require("../middlewares/redirectToHomeIfLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

publicRouter.get("/users", pagesController.showUser);

publicRouter.get("/home", isLoggedIn, pagesController.showHome);
publicRouter.get("/index", redirectToHomeIfLoggedIn, pagesController.showIndex);
publicRouter.get("/", function (req, res) {
  res.redirect("home");
});

publicRouter.get("/profile/:userName", isLoggedIn, pagesController.showProfile);
publicRouter.get("/logout", authController.logOut);

publicRouter.post("/login", authController.logIn);
publicRouter.post("/register", validateRegistrationData, userController.register);

module.exports = publicRouter;
