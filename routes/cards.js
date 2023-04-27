const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../utils/constants');

const { createCard } = require('../controllers/cards');
const { getAllCards } = require('../controllers/cards');
const { deleteCard } = require('../controllers/cards');
const { likeCard } = require('../controllers/cards');
const { dislikeCard } = require('../controllers/cards');

cardsRouter.get('/', getAllCards);

cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(regExp),
    }),
  }),
  createCard
);

cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum(),
    }),
  }),
  deleteCard
);
cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum(),
    }),
  }),
  likeCard
);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum(),
    }),
  }),
  dislikeCard
);

module.exports = cardsRouter;
