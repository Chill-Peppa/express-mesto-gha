const { Joi } = require('celebrate');
const { regExp } = require('./constants');

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const registrationValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regExp),
  }),
};

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regExp),
  }),
};

const deleteCardValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const likeCardValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const dislikeCardValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const getUserByIdValidation = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

const updateProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const updateAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().regex(regExp).required(),
  }),
};

module.exports = {
  loginValidation,
  registrationValidation,
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  dislikeCardValidation,
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
};
