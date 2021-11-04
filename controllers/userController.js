const User = require("../models/User");
const bcryptjs = require("bcryptjs");

async function register(req, res) {
  console.log("Entré al register");
  console.log(req.body);
  try {
    req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10));
    req.body.avatarPic = "default.jpeg";
    req.body.profilePic = "default.jpeg";
    const newUser = await User.create(req.body);
    console.log(newUser);
    alert("Usuario registrado correctamente!");
    res.json({
      newUserName: newUser.userName,
      newFirstName: newUser.firstName,
      newLastName: newUser.lastName,
      newEmail: newUser.email,
      bornDate: newUser.dob,
    });
  } catch (error) {
    console.log(error);
  }
}

async function searchUser(req, res) {
  try {
    const thisUser = await User.findOne(req.user);

    const users = await User.find({ _id: { $ne: req.user._id } });
    const ids = [];
    for (member of users) ids.push(member._id);
    const shuffled = ids.sort(function () {
      return 0.5 - Math.random();
    });
    const selected = shuffled.slice(0, 4);
    const randomUsers = [];

    for (id of selected) {
      const user = await User.findById(id);
      randomUsers.push(user);
    }

    console.log("Entre a busqueda.");
    const param = req.query.lookFor;
    const lookFor = new RegExp(param, "i");
    const result = await User.find({
      $and: [{ $or: [{ userName: lookFor }, { lastName: lookFor }, { firstName: lookFor }] }],
    });
    //aplicarle un filtro a result sacando al usuario logueado

    res.render("users", { users: result, randomUsers, thisUser });
  } catch (error) {
    console.log(error);
  }
}

async function followToggle(req, res) {
  console.log(req.method);
  console.log(req.user.userId);
  console.log(req.body.userToFollow);
  /* try {
    const user = await User.findOne({ _id: req.user.id });
    const userToFollow = await User.findOne({ _id: req.body.userToFollow });
    const found = user.following.find(
      (element) => String(element) === String(req.body.userToFollow),
    );
    console.log(user);
    console.log(userToFollow);
    console.log(found);

    if (found) {
      //el usuario si esta en el array, hay que sacarlo
      console.log("Lo sigue, hay que sacarlo!!!!");
      await user.following.pull(userToFollow);
      await userToFollow.followedBy.pull(user);
      await user.save();
      await userToFollow.save();
      res.redirect("home");
    } else {
      //el usuario no esta en el array, hay que agregarlo
      console.log("NO lo sigue, hay que agregarlo!!!!");
      await user.following.push(userToFollow);
      await userToFollow.followedBy.push(user);
      await user.save();
      await userToFollow.save();
      res.redirect("home");
    }
  } catch (error) {
    console.log(error);
    const errores = {
      mensaje: error,
    };
    res.status(404).send(errores);
  } */
}

module.exports = {
  register,
  searchUser,
  followToggle,
};
