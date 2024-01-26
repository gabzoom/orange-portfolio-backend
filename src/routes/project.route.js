import express from 'express';
import projectController from '../controllers/project.controller.js';
import { validId } from '../middlewares/global.middlewares.js';

const router = express.Router();

router.get("/", projectController.findAllProjects);
router.get("/:id", validId, projectController.findProjectById);
router.post("/", projectController.createProject);
router.patch("/:id", validId, projectController.updateProject);
router.delete("/:id", validId, projectController.deleteProjectById);

export default router;