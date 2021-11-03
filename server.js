require("dotenv").config();

var cors = require("cors");

const express = require("express");
require("./database");
const routes = require("./routes/index");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
app.use(cors());
app.use(express.static("public"));

app.use(express.json());

const MongoStore = require("connect-mongo");

routes(app);

//dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto http://localhost:${APP_PORT} \n`),
);

//telefonos
//Neri : 092387516
//Joaquin : 098357819
//Pierre : 099849654
