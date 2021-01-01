const mongoose = require("mongoose");

const Visite = mongoose.model(
  "Visite",
  new mongoose.Schema({
    username: String,
    ordonnance: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ordonnance"
        },

    analyse: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Analyse"
        }    

  })
);

module.exports = Visite;