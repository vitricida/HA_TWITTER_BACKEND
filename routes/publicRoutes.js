const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");

publicRouter.get("/home", pagesController.showHome);
publicRouter.get("/", function (req, res) {
  res.redirect("home");
});
publicRouter.get("/login", pagesController.showLogin);
publicRouter.get("/register", pagesController.showRegister);
publicRouter.get("/myprofile", pagesController.showMyProfile);
publicRouter.get("/profile?:id", pagesController.showProfile);

module.exports = publicRouter;
