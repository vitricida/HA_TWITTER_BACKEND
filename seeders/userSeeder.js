const faker = require("faker");
const { User } = require("../models/index");
const database = require("../database");
const bcryptjs = require("bcryptjs");

database.connection.dropDatabase();

faker.locale = "es";

module.exports = async () => {
  const newUsers = [];

  for (let i = 0; i < 100; i++) {
    newUsers.push({
      userName: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      dob: faker.date.between("1950-01-01", "2005-01-05"),
      password: bcryptjs.hashSync("poroto", bcryptjs.genSaltSync(10)),
      bio: "Mi Bio de prueba, es la mejor BIO!!!",
      avatarPic: "demo",
      profilePic: "demo",
      following: [],
      followedBy: [],
    });
  }

  await User.insertMany(newUsers);
  console.log("[Database] Se corrió el seeder de Articles.");
};
