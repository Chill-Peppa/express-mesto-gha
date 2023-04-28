const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../utils/constants');

const { getUsers } = require('../controllers/users');
const { getInfoMe } = require('../controllers/users');
const { getUserById } = require('../controllers/users');
const { updateProfile } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoMe);
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  getUserById
);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regExp),
    }),
  }),
  updateAvatar
);

module.exports = usersRouter;
