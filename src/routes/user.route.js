import express from 'express';
import userController from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';
import { body } from 'express-validator';


const router = express.Router();


router.get("/", userController.findAllUsers);
router.get("/:id", validId, validUser, userController.findUserById);
router.post("/", 
body('email').isEmail().withMessage("use um email valido")
,userController.createUser);

router.patch("/:id", body('email').isEmail().withMessage("use um email valido")
,validId, validUser, userController.updateUser);

export default router;  