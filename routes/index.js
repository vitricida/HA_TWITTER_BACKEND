const publicRoutes = require("./publicRoutes");
const tweetsRoutes = require("./tweetsRoutes");

module.exports = (app) => {
  app.use(publicRoutes, tweetsRoutes);
};
