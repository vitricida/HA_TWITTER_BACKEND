const passport = require("passport");

const logIn = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/index",
});

async function logOut(req, res) {
  req.logout();
  res.redirect("/index");
}

module.exports = {
  logIn,
  logOut,
};
