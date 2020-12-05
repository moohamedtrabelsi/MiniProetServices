const express = require("express");
const router = express.Router();
const controller = require("../controllers/file.controller");

module.exports = function( app ){
    app.post("/api/auth/uploadfile", controller.upload);

}
