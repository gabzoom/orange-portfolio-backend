import Project from '../models/Project.js';
import projectService from '../services/project.service.js';
import { validationResult } from 'express-validator';
import fs from 'fs';
const findAllProjects = async (req, res) => {
    try {
        const projects = await projectService.findAll();

        if (projects.length === 0) {
            return res.status(400).send({ message: "Não há projetos criados" });
        }

        res.json(projects);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const findProjectById = async (req, res) => {
    const id = req.params.id;
    try {
        const project = await projectService.findById(id);

        res.send(project);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, urlGithub, description, tags } = req.body;

        if (!title || !urlGithub || !description ) {
            res.status(400).send({ message: "Preencha todos os campos obrigatórios para criar o projeto" });
        };
        
      

        const file =req.file;

        const project = await projectService.create({
            title,
            urlGithub,
            description,
            projectImage: file.path,
            tags,
            user: { _id: "65b53f336eb3b000edc8dede" } //user vinculado manualmente para testes
            //o user dinâmico vai ser vinculado no front com os dados da Context
        });
      
        

        

        if (!project) {
            return res.status(400).send({ message: "Erro na criação do projeto" });
        }

        res.status(201).send("Projeto criado com sucesso");
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { title, urlGithub, description, projectImage, tags } = req.body;

        if (!title && !urlGithub && !description && !projectImage && !tags) {
            res.status(400).send({ message: "Preencha ao menos um campo para atualização" });
        };

        const id = req.params.id;

        await projectService.update(id, title, urlGithub, description, projectImage, tags);

        res.send({ message: "Projeto atualizado com sucesso" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const deleteProjectById = async (req, res) => {
    const { id } = req.params;
        try {
    const project = await projectService.findById(id);

            if(!id){
                return res.status(404).json({message: "Projeto não encontrado"});
            }

        fs.unlinkSync(project.projectImage);
        res.status(204).send('Projeto removido com sucesso');
        await projectService.deleteById(id);
        res.status(204).send('Projeto removido com sucesso');
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export default { findAllProjects, findProjectById, createProject, updateProject, deleteProjectById }