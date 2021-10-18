module.exports = async function (req, res, next) {
  const tweet = req.body.tweetContent;
  if (tweet.length <= 140) {
    return next();
  } else {
    console.log("Largo del Tweet supera los 140 caracteres.");
    const errores = {
      errores: "Largo del Tweet no puede superar los 140 caracteres.",
    };
    res.status(404).render("error", { errores });
  }
};
