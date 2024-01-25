const userService = require('../services/user.service');
const mongoose = require('mongoose');

const validId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "ID inválido" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userService.findById(id);

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado" });
        }

        req.id = id;
        req.user = user;

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { validId, validUser };