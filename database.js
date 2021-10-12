const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/db-hack-academy");

module.exports = mongoose;
