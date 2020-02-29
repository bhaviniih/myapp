const express = require("express");
const routes = express.Router();
const connectToDatabase = require('../config/database');
const validate = require('express-validation')
const userValidate = require('../validation/userlist')
const userController = require('../controllers/userlist')
const bodyParser = require("body-parser");


routes.get("/", userController.list);
routes.post("/", validate(userValidate.register), userController.register);
routes.post("/logincheck", validate(userValidate.logincheck), userController.logincheck);
routes.post("/logout", userController.logout);


module.exports = routes;