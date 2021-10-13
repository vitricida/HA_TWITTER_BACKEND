const faker = require("faker");
const { User, Tweet } = require("../models/index");

module.exports = async () => {
  const newTweets = [];
  for (let i = 0; i < 100; i++) {
    const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
    newTweets.push({
      content: faker.lorem.sentences(3),
      date: faker.date.between("2021-10-01", "2021-10-12"),
      likes: [],
      owner: randomUser[0]._id,
    });
  }

  await Tweet.insertMany(newTweets);
  console.log("[Database] Se corrió el seeder de Tweets!");
};
