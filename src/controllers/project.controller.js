import projectService from '../services/project.service.js';

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
    try {
        const { title, urlGithub, description, projectImage, tags } = req.body;

        if (!title || !urlGithub || !description || !projectImage) {
            res.status(400).send({ message: "Preencha todos os campos obrigatórios para criar o projeto" });
        };

        const project = await projectService.create({
            title,
            urlGithub,
            description,
            projectImage,
            tags,
            user: { _id: "65b2789d35384d48e458ec8b" } //user vinculado manualmente para testes
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
        await projectService.deleteById(id);
        res.status(204).send('Projeto removido com sucesso');
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export default { findAllProjects, findProjectById, createProject, updateProject, deleteProjectById }