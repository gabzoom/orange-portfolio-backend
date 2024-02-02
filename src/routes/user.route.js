import express from 'express';
import userController from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';
import { body } from 'express-validator';


const router = express.Router();


router.get("/", userController.findAllUsers);
router.get("/:id", validId, validUser, userController.findUserById);
router.post("/", 
body('email').isEmail().withMessage("use um email valido"),
body('name').isLength({min: 2, max: 150}).withMessage("Use um nome com mais de 2 caracteres"),
body('lastName').isLength({min: 2, max: 150}).withMessage("Use um sobrenome com mais de 2 caracteres"),
body('password').isLength({min: 6, max: 30}).withMessage("use uma senha com mais de 6 caracteres")
,userController.createUser);

router.patch("/:id", 
body('email').isEmail().withMessage("use um email valido"),
body('name').isLength({min: 2, max: 150}).withMessage("Use um nome com mais de 2 caracteres"),
body('lastName').isLength({min: 2, max: 150}).withMessage("Use um sobrenome com mais de 2 caracteres"),
body('password').isLength({min: 6, max: 30}).withMessage("use uma senha com mais de 6 caracteres")
,validId, validUser, userController.updateUser);

export default router;  