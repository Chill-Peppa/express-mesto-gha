const User = require('../models/user');

//ищем всех юзеров
const getUsers = (req, res) => {
  User.find({}).then((users) => res.send({ data: users }));
};

//ищем юзера по его айди
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId).then((user) => res.send({ data: user }));
};

//создаем нового юзера
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
