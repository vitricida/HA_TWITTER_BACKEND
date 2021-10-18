const User = require("../models/User");
const bcryptjs = require("bcryptjs");

async function register(req, res) {
  try {
    req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10));
    const newUser = await User.create(req.body);
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  register,
};
