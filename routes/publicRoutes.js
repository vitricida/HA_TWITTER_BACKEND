const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const validateRegistrationData = require("../middlewares/validateRegistrationData");

publicRouter.get("/home", pagesController.showHome);
publicRouter.get("/index", pagesController.showIndex);
publicRouter.get("/", function (req, res) {
  res.redirect("home");
});

publicRouter.get("/profile/:userName", pagesController.showProfile);

publicRouter.post("/login", authController.logIn);
publicRouter.post("/register", validateRegistrationData, userController.register);

module.exports = publicRouter;
