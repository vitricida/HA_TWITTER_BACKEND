const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/HA_TWITTER");

module.exports = mongoose;
