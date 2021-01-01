const express = require("express");
const { connect } = require("mongoose");
const router = express.Router();
const controller = require("../controllers/ordonnance.controller");

module.exports = function( app ){
    app.post("/api/createordon", controller.createOrdonnance);

 

}