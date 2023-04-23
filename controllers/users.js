const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
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
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Пользователь не найден.',
        });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR).send({ message: 'Введен некорректный id.' });
        return;
      }
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;

  bcrypt
    .hash(req.body.password, 5)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((newUser) => {
      res.send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
      });
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

const login = (req, res) => {
  const { email, password } = req.body;

  if (validator.isEmail(email)) {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          res.status(ERROR_NOT_FOUND).send({
            message: 'Пользователь не найден.',
          });
        }
        return bcrypt.compare(password, user.password);
      })
      .then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          res.status(401).send({
            message: 'Неправильные почта или пароль.',
          });
        }

        const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
          expiresIn: '7d',
        });
        res.send({ token });
      })
      .catch((err) => {
        res.status(401).send({ message: err.message });
      });
  }
};

const updateProfile = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Пользователь c указанным id не найден.',
        });
      } else {
        res.send({ data: user });
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

  User.findByIdAndUpdate(
    owner,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Пользователь c указанным id не найден.',
        });
      } else {
        res.send({ data: user });
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
  login,
};
