const userService = require('../services/user.service');

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();

    if (users.length === 0) {
      return res.status(400).send({ message: "Não há usuários cadastrados" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      res.status(400).send({ message: "Preencha todos os campos para fazer o cadastro" });
    };

    const user = await userService.create(req.body);

    if (!user) {
      return res.status(400).send({ message: "Erro na criação do usuário" });
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
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, lastName, email, password, country, avatar } = req.body;

    if (!name && !lastName && !email && !password && !country && !avatar) {
      res.status(400).send({ message: "Preencha ao menos um campo para atualização" });
    };

    const { id, user } = req;

    await userService.update(id, name, lastName, email, password, country, avatar);

    res.send({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser
};