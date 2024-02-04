import Project from "../models/Project.js";
import projectService from "../services/project.service.js";
import { validationResult } from "express-validator";
import { ObjectId } from 'mongodb';
import fs from "fs";

//a lógica que cada consulta de api passa

//aqui pega todos projetos do banco
const findAllProjects = async (req, res) => {
  try {
    const projects = await projectService.findAll();

    if (projects.length === 0) {
      return res.status(400).send({ message: "Não há projetos criados" });
    }

    res.json(projects);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//aqui passsa todos projetos pelo id do usuario
const findProjectById = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await projectService.findById(id);

    if (!project) {
      return res.status(404).send({ message: "Projeto não encontrado" });
    }
    res.send(project);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findProjectByUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await projectService.findByUserId(id);

    if (!project) {
      return res.status(404).send({ message: "Projeto não encontrado" });
    }
    res.send(project);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//cria os projetos
const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, urlGithub, description, tags, user } = req.body;

    if (!title || !urlGithub || !description) {
      res
        .status(400)
        .send({
          message: "Preencha todos os campos obrigatórios para criar o projeto",
        });
    }

    const tagArray =
      typeof tags === "string" && tags.trim() !== "" ? tags.split(",") : tags;
    const file = req.file;

    const project = await projectService.create({
      title,
      urlGithub,
      description,
      projectImage: file.path,
      tags: tagArray,
      user,
    });

    res.status(201).send({message: "Projeto criado com sucesso", project: project});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//método que valida a url do update
const isValidUrl = (url) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
};

//método que atualiza todos componentes do projeto que forem solicitados
//até as imagens
const updateProject = async (req, res) => {
  try {
    const { title, urlGithub, description, tags } = req.body;

    if (urlGithub && !isValidUrl(urlGithub)) {
      return res.status(400).send({ message: "A URL do GitHub não é válida" });
    }

    // Verificar se o título tem mais de 2 caracteres
    if (title && title.length <= 2) {
      return res
        .status(400)
        .send({ message: "O título deve ter mais de 2 caracteres" });
    }

    // Verificar se o título tem mais de 2 caracteres
    if (description && description.length <= 3) {
      return res
        .status(400)
        .send({ message: "A descrição deve ter mais de 2 caracteres" });
    }

    if (!title && !urlGithub && !description && !req.file && !tags) {
      return res
        .status(400)
        .send({ message: "Preencha ao menos um campo para atualização" });
    }

    const id = req.params.id;

    const projectToUpdate = await projectService.findById(id);

    if (!projectToUpdate) {
      return res.status(404).send({ message: "Projeto não encontrado" });
    }

    if (req.file) {
      // Excluir o arquivo existente
      if (fs.existsSync(projectToUpdate.projectImage)) {
        fs.unlinkSync(projectToUpdate.projectImage);
      }
      projectToUpdate.projectImage = req.file.path; // Atualizar com o novo arquivo
    }

    // Transforma as tags em um array
    const tagArray =
      typeof tags === "string" && tags.trim() !== "" ? tags.split(",") : tags;

    await projectService.update(
      id,
      title,
      urlGithub,
      description,
      projectToUpdate.projectImage,
      tagArray,
    );

    res.send({ message: "Projeto atualizado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//apaga os projetos com o id dele sendo referenciado
const deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await projectService.findById(id);

    if (!id) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }
    if (fs.existsSync(project.projectImage)) {
      fs.unlinkSync(project.projectImage);
    }
    await projectService.deleteById(id);
    res.status(204).send("Projeto removido com sucesso");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  findAllProjects,
  findProjectById,
  findProjectByUserId,
  createProject,
  updateProject,
  deleteProjectById,
};
