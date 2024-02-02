import express from 'express';
import projectController from '../controllers/project.controller.js';
import { validId } from '../middlewares/global.middlewares.js';
import upload from '../config/multer.js';
import { body } from 'express-validator';

//pasta que realiza as chamadas de api para projetos
//se passa o id para a api e realiza as operações(patch, post(id do usuario) e delete)
//o upload single atualiza as imagens ou adiciona na pasta UPLOADS

const router = express.Router();

router.get("/", projectController.findAllProjects);
router.get("/:id", validId, projectController.findProjectById);


router.post("/", upload.single('file'),//no front colocamos um filter para Cannot read properties of undefined (reading 'path')"
body('urlGithub').isURL().withMessage("use um link valido, exemplo: http://google.com"),
body('title').isLength({min: 2, max: 150}).withMessage("Use um nome válido"),
body('country').isLength({max: 150}).withMessage("País deve ter menos de 150 caracteres"),
body('description').isLength({min: 1, max: 300}).withMessage("Coloque uma descrição com menos de 300 caracteres"),
projectController.createProject);

router.patch("/:id", validId, upload.single('file'),


 projectController.updateProject);
 
router.delete("/:id", validId, projectController.deleteProjectById);

export default router;