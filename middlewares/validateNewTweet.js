module.exports = async function (req, res, next) {
  const tweet = req.body.tweetContent;
  if (tweet.length <= 140) {
    return next();
  } else {
    console.log("Largo del Tweet supera los 140 caracteres.");
    const errores = {
      mensaje: "Largo del Tweet supera los 140 caracteres.",
    };
    res.status(404).send(errores);
    //res.status(404).render("error", errores);
  }
};
