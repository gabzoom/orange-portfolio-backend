import express from 'express';
import userController from '../controllers/user.controller.js';
import { validUser } from '../middlewares/global.middlewares.js';
import { body } from 'express-validator';
import upload from '../config/multer.js';

const router = express.Router();


router.get("/", userController.findAllUsers);
router.get("/:id", validUser, userController.findUserById);
router.post("/", upload.single('file'),
body('email').isEmail().withMessage("use um email valido"),
body('name').isLength({min: 2, max: 150}).withMessage("Use um nome com mais de 2 caracteres"),
body('lastName').isLength({min: 2, max: 150}).withMessage("Use um sobrenome com mais de 2 caracteres"),
body('country').isLength({max: 150}).withMessage("País deve ter menos de 150 caracteres")

,userController.createUser);

router.patch("/:id", validUser, upload.single('file'), 

userController.updateUser);

export default router;  