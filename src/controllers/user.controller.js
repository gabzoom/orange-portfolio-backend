import { validationResult } from "express-validator";
import userService from "../services/user.service.js";
import fs from "fs";


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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, lastName, email, _id } = req.body;

    if (!name || !lastName || !email || !_id ) {
      res
        .status(400)
        .send({ message: "Preencha todos os campos para fazer o cadastro" });
    }

    const user = await userService.create(req.body);

    if (!user) {
      return res.status(400).send({ message: "Erro na criação do usuário" });
    }

    res.status(201).send({
      message: "Usuário criado com sucesso",
      user: {
        _id: user._id,
        name,
        lastName,
        email,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, lastName, email, country } = req.body;

    if (!name && !lastName && !email && !country ) {
      res
        .status(400)
        .send({ message: "Preencha ao menos um campo para atualização" });
    }

    const id = req.params.id;

    const userToUpdate = await userService.findById(id);

    if (!userToUpdate) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    if (req.file) {
      // Excluir o arquivo se ele existir
      if(fs.existsSync(userToUpdate.avatar)){
        fs.unlinkSync(userToUpdate.avatar);
      }
      userToUpdate.avatar = req.file.path; // Atualizar com o novo arquivo
    }

    await userService.update(
      id,
      name,
      lastName,
      email,
      country,
      userToUpdate?.avatar
    );

    res.send({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { findAllUsers, findUserById, createUser, updateUser };
