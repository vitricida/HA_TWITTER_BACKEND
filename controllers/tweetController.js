async function showTweet(req, res) {
  const tweet = req.query.id;
  res.send("Voy a mostrar el tweet con ID : " + tweet + ".");
}

module.exports = {
  showTweet,
};
