const userService = require('../services/user.service');
const mongoose = require('mongoose');

const findAllUsers = async (req, res) => {
  const users = await userService.findAll();

  if (users.length === 0) {
    return res.status(400).send({ message: "Não há usuários cadastrados" })
  }

  res.send(users);
};

const findUserById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID inválido" })
  }

  const user = await userService.findById(id);

  if (!user) {
    return res.status(400).send({ message: "Usuário não encontrado" })
  }

  res.send(user);
};

const createUser = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  if (!name || !lastName || !email || !password) {
    res.status(400).send({ message: "Preencha todos os campos para fazer o cadastro" })
  };

  const user = await userService.create(req.body);

  if (!user) {
    return res.status(400).send({ message: "Erro na criação do usuário" })
  }

  res.status(201).send({
    message: 'Usuário criado com sucesso',
    user: {
      id: user._id,
      name,
      lastName,
      email,
    }
  });
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser
};