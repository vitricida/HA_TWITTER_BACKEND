const { User, Tweet } = require("../models/index");

module.exports = async () => {
  for (let i = 0; i < 100; i++) {
    const randomTweet = await Tweet.aggregate([{ $sample: { size: 1 } }]);
    const randomUserAmount = Math.floor(Math.random() * 100) + 1;
    console.log(
      i +
        ") Al Tweet : " +
        randomTweet[0]._id +
        " Se le van a agregar " +
        randomUserAmount +
        " likes.",
    );
    const randomUsers = await User.aggregate([{ $sample: { size: randomUserAmount } }]);
    randomUsers.forEach(async (randomUser) => {
      const selectedTweet = await Tweet.findById(randomTweet[0]._id);
      selectedTweet.likes.push(randomUser);
      await selectedTweet.save();
    });
  }
  console.log("[Database] Se corrió el seeder de Likes!");
};
