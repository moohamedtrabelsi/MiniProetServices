const mongoose = require("mongoose");

const Analyse = mongoose.model(
  "Analyse",
  new mongoose.Schema({
    
    patient: String,
    doctor:String,
    filename: String

  })
);

module.exports = Analyse;
