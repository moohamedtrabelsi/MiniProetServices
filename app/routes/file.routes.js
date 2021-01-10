const express = require("express");
const { connect } = require("mongoose");
const router = express.Router();
const controller = require("../controllers/file.controller");

module.exports = function( app ){

    app.post("/api/auth/uploadfile", controller.upload);

    app.post("/api/auth/analyse", controller.analyse);

    app.post("/api/auth/send", controller.send);

    app.get("/api/getfiles", controller.getListFiles);

    app.get("/api/getlastname", controller.getListFilesNames);

    app.get('/api/image/:filename', controller.getimage);

}
