const publicRoutes = require("./publicRoutes");
const tweetsRoutes = require("./tweetsRoutes");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

module.exports = (app) => {
  app.use(makeUserAvailableInViews);
  app.use(publicRoutes, tweetsRoutes);
};
