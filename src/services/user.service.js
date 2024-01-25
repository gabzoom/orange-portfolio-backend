const User = require('../models/User');

const findAll = () => User.find();

const findById = (id) => User.findById(id);

const create = (body) => User.create(body);

module.exports = {
    findAll,
    findById,
    create
}