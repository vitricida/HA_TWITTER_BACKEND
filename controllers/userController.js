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
  console.log(req.params);

  const param = req.params.lookFor;
  const lookFor = new RegExp(param, "i");

  console.log(lookFor);
  const result = await User.find({
    $and: [{ $or: [{ userName: lookFor }, { lastName: lookFor }, { firstName: lookFor }] }],
  });
  console.log(result);
}

module.exports = {
  register,
  searchUser,
};
