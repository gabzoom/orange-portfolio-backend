import express from 'express';
import projectController from '../controllers/project.controller.js';
import { validId } from '../middlewares/global.middlewares.js';
import upload from '../config/multer.js';
import { body } from 'express-validator';



const router = express.Router();

router.get("/", projectController.findAllProjects);
router.get("/:id", validId, projectController.findProjectById);

router.post("/", upload.single('file'),//no front colocamos um filter para Cannot read properties of undefined (reading 'path')"
body('urlGithub').isURL().withMessage("use um link valido"),
body('title').isLength({min: 2}).withMessage("Use um nome válido"),
body('description').isLength({min: 1}).withMessage("Coloque uma descrição"),
projectController.createProject);

router.patch("/:id", validId, upload.single('file'),
body('urlGithub').isURL().withMessage("use um link valido"),
body('title').isLength({min: 2}).withMessage("Use um nome válido"),
body('description').isLength({min: 1}).withMessage("Coloque uma descrição"),
 projectController.updateProject);
 
router.delete("/:id", validId, projectController.deleteProjectById);

export default router;