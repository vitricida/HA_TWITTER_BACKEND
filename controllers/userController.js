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

async function searchUser(req, res) {
  console.log("aca llegue");
  console.log(req.query);
  const lookFor = String(req.query.lookFor);
  const result = await User.find({
    $or: [{ userName: lookFor }, { firtsName: lookFor }, { lastName: lookFor }],
  });
  console.log(result);
}

module.exports = {
  register,
  searchUser,
};
