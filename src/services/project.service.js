import Project from '../models/Project.js';


const findAll = () => Project.find();

const findById = (id) => Project.findById(id);

const findByUserId = (userId) => Project.find({ user: userId });

const create = (body) => Project.create(body);

const update = (id, title, urlGithub, description, projectImage, tags) => Project.findOneAndUpdate(
    { _id: id },
    { title, urlGithub, description, projectImage, tags }
);

const deleteById = (id) => Project.findByIdAndDelete(id);

export default { findAll, findById, create, update, deleteById, findByUserId }