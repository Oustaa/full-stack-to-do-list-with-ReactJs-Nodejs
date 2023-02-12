const mongoose = require("mongoose");

const User = mongoose.Schema({
  _id: String,
  email: String,
  email_verified: Boolean,
  name: Object,
  picture: String,
});

module.exports = mongoose.model("User", User);
