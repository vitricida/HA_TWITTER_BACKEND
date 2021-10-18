module.exports = async function (req, res, next) {
  const tweet = req.body.tweetContent;

  if (tweet.length <= 140 && tweet.length >= 1) {
    return next();
  } else {
    console.log("Largo del Tweet no valido (entre 1 y 140 caracteres).");
    const errores = {
      errores: "Largo del Tweet no valido (entre 1 y 140 caracteres.",
    };
    res.status(404).render("error", { errores });
  }
};
