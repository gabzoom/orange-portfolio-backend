import User from '../models/User.js';

const findAll = () => User.find();

const findById = (id) => User.findById(id);

const create = (body) => User.create(body);

const update = (id, name, lastName, email, country, avatar) => User.findOneAndUpdate(
    { _id: id },
    { name, lastName, email, country, avatar }
);



export default { findAll, findById, create, update }