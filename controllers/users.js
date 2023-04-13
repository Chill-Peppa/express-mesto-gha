const User = require('../models/user');
const { ERROR, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.send({ data: user });

      if (!user) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Пользователь не найден.',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR).send({ message: 'Введенный некорректный id.' });
        return;
      }
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
        return;
      }
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const updateProfile = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(owner, { name, about })
    .then((user) => {
      res.send({ data: user });

      if (!user) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Пользователь c указанным id не найден.',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
        return;
      }
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(owner, { avatar })
    .then((user) => {
      res.send({ data: user });

      if (!user) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Пользователь c указанным id не найден.',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
        return;
      }
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
