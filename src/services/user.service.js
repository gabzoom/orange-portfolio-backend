const User = require('../models/User');

const findAll = () => User.find();

const findById = (id) => User.findById(id);

const create = (body) => User.create(body);

const update = (id, name, lastName, email, password, country, avatar) => User.findOneAndUpdate(
    { _id: id },
    { name, lastName, email, password, country, avatar }
);

module.exports = {
    findAll,
    findById,
    create,
    update
}