const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    analyses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Analyse"
      }
    ],
    visites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visite"
      }
    ],
    listofdp: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  })
);

module.exports = User;
