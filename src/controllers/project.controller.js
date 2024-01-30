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
        return  res.status(400).json({ errors: errors.array() });
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
      

        res.status(201).send("Projeto criado com sucesso");
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { title, urlGithub, description, tags } = req.body;

        // Verificar se o título tem mais de 2 caracteres
        if (title && title.length <= 2) {
            return res.status(400).send({ message: "O título deve ter mais de 2 caracteres" });
        }

        if (!title && !urlGithub && !description && !req.file && !tags) {
            return res.status(400).send({ message: "Preencha ao menos um campo para atualização" });
        }

        const id = req.params.id;

        const projectToUpdate = await projectService.findById(id);

        if (!projectToUpdate) {
            return res.status(404).send({ message: "Projeto não encontrado" });
        }

        if (req.file) {
            // Excluir o arquivo existente
            fs.unlinkSync(projectToUpdate.projectImage);
            projectToUpdate.projectImage = req.file.path; // Atualizar com o novo arquivo
        }

        // Transforma as tags em um array
        const tagArray = (typeof tags === 'string' && tags.trim() !== '') ? tags.split(',') : [];

        // Atualiza as tags: combina as tags existentes com as novas
        const updatedTags = [...new Set([...projectToUpdate.tags, ...tagArray])];

        await projectService.update(id, title, urlGithub, description, projectToUpdate.projectImage, updatedTags);

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