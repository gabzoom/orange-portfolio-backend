import express from 'express';
import projectController from '../controllers/project.controller.js';
import { validId } from '../middlewares/global.middlewares.js';
import upload from '../config/multer.js';
import { body } from 'express-validator';



const router = express.Router();

router.get("/", projectController.findAllProjects);
router.get("/:id", validId, projectController.findProjectById);
router.post("/", upload.single('file'),
body('urlGithub').isURL().withMessage("use um link valido"),
body('file').isEmpty().withMessage("por favor selecione uma imagem válida")

,projectController.createProject);
router.patch("/:id", validId, upload.single('file'), projectController.updateProject);
router.delete("/:id", validId, projectController.deleteProjectById);

export default router;