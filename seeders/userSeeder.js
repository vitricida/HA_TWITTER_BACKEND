const faker = require("faker");
const { User } = require("../models/index");
const database = require("../database");
const bcryptjs = require("bcryptjs");

database.connection.dropDatabase();

faker.locale = "es";

module.exports = async () => {
  const newUsers = [];

  newUsers.push({
    userName: "admin",
    firstName: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    dob: "1984-08-19",
    password: bcryptjs.hashSync("admin", bcryptjs.genSaltSync(10)),
    bio: "BIO de Admin",
    avatarPic: "admin.gif",
    profilePic: "default.jpeg",
    following: [],
    followedBy: [],
  });
  /* for (let i = 0; i < 10; i++) {
    newUsers.push({
      userName: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      dob: faker.date.between("1950-01-01", "2005-01-05"),
      password: bcryptjs.hashSync("poroto", bcryptjs.genSaltSync(10)),
      bio: "Mi Bio de prueba, es la mejor BIO!!!",
      avatarPic: "default.jpeg",
      profilePic: "default.jpeg",
      following: [],
      followedBy: [],
    });
  } */

  await User.insertMany(newUsers);
  console.log("[Database] Se corrió el seeder de Usuarios!");
};
