const route = require("express").Router();
const userController = require("../controllers/user.controller");
const { validId, validUser } = require("../middlewares/global.middlewares");

route.get("/", userController.findAllUsers);
route.get("/:id", validId, validUser, userController.findUserById);
route.post("/", userController.createUser);
route.patch("/:id", validId, validUser, userController.updateUser);

module.exports = route;