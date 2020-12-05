const mongoose = require("mongoose");

const Ordonnance = mongoose.model(
  "Ordonnance",
  new mongoose.Schema({
    medicaments: String
  })
);

module.exports = Ordonnance;
