const express = require("express");
const { connect } = require("mongoose");
const router = express.Router();
const controller = require("../controllers/analyse.controller");

module.exports = function( app ){
    app.post("/api/auth/get", controller.getAnalyse);

}