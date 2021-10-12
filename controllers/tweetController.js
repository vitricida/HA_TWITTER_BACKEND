async function showTweet(req, res) {
  const tweet = req.query.id;
  res.send("Voy a mostrar el tweet con ID : " + tweet + ".");
}

async function createTweet(req, res) {
  res.send("crear tweet");
}

module.exports = {
  showTweet,
  createTweet,
};
