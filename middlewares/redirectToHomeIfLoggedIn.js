function redirectIfLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("home");
  }
}

module.exports = redirectIfLoggedIn;
