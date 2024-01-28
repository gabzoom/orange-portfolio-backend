import express from 'express';
import projectController from '../controllers/project.controller.js';
import { validId } from '../middlewares/global.middlewares.js';
import upload from '../config/multer.js';
import { body } from 'express-validator';



const router = express.Router();

router.get("/", projectController.findAllProjects);
router.get("/:id", validId, projectController.findProjectById);
router.post("/", upload.single('file'),
body('urlGithub').isURL().withMessage("use um link valido")

,projectController.createProject);
router.patch("/:id", validId, projectController.updateProject);
router.delete("/:id", validId, projectController.deleteProjectById);

export default router;