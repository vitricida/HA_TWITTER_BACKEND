require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const express = require("express");
require("./database");
const routes = require("./routes/index");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "userName", passwordField: "password" }, async function (
    username,
    password,
    done,
  ) {
    const user = await User.findOne({
      userName: username,
    });

    if (!user) {
      return done(null, false, {
        message: "Usuario inexistente.",
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, {
        message: "Password incorrecta.",
      });
    }
    return done(null, user, { message: "Entraste" });
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user); // Usuario queda disponible en req.user.
    })
    .catch((error) => {
      done(error, user);
    });
});

routes(app);

//dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto http://localhost:${APP_PORT} \n`),
);

//telefonos
//Neri : 092387516
//Joaquin : 098357819
//Pierre : 099849654
