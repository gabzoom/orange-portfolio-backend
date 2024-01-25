const route = require("express").Router();
const userController = require("../controllers/user.controller");

route.get("/", userController.findAllUsers);
route.get("/:id", userController.findUserById);
route.post("/", userController.createUser);

module.exports = route;