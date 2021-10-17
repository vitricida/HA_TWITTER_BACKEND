module.exports = async function (req, res, next) {
  const { userName, firstName, lastName, email, dob, password } = req.body;

  const regex = /^[a-z ,.'-]+$/i;
  const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const regexDate = /^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
  const errores = {};

  if (!regex.test(userName) || !regex.test(firstName) || !regex.test(lastName)) {
    errores.textos = "El nombre no puede estar vacío ni contener caracteres extraños";
  }

  if (!regexEmail.test(email)) {
    errores.email = "El email ingresado no es valido";
  }

  if (password.length < 6) {
    errores.password = "La contraseña debe tener un largo mínimo de 6 caracteres";
  }

  if (!regexDate.test(dob)) {
    errores.dob = "La fecha de nacimiento es invalida";
  }

  if (Object.keys(errores).length === 0) {
    return next();
  } else {
    console.log(errores);
    //res.status(404).send(errores);
    res.status(404).render("error", { errores });
  }
};
