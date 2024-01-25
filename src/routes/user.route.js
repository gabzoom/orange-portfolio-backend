import express from 'express';
import userController from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';

const router = express.Router();

router.get("/", userController.findAllUsers);
router.get("/:id", validId, validUser, userController.findUserById);
router.post("/", userController.createUser);
router.patch("/:id", validId, validUser, userController.updateUser);

export default router;