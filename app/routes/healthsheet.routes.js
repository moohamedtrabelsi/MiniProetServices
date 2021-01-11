const express = require("express");
const { connect } = require("mongoose");
const router = express.Router();
const controller = require("../controllers/ordonnance.controller");
const controllerv = require("../controllers/visite.controller");


module.exports = function( app ){
    app.post("/api/createordon", controller.createOrdonnance);
    app.post("/api/createvisite", controllerv.visite);
    app.post("/api/sendvisite", controllerv.sendvisite);
    app.post("/api/getvisite", controllerv.getVisite);



}