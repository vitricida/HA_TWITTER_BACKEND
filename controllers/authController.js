const passport = require("passport");

const logIn = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/index",
});

module.exports = {
  logIn,
};
