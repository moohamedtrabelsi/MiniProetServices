const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.analyse = require("./analyse.model");
db.ordonnance = require("./ordonnance.model");
db.visite = require("./visite.model")
db.ROLES = ["Doctor", "Patient", "User"];

module.exports = db;