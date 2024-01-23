const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.get("/hello", userController.hello);

module.exports = route;
