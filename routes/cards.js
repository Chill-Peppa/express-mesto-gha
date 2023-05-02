const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { createCardValidation, deleteCardValidation, likeCardValidation, dislikeCardValidation } = require('../utils/validation');

const { createCard } = require('../controllers/cards');
const { getAllCards } = require('../controllers/cards');
const { deleteCard } = require('../controllers/cards');
const { likeCard } = require('../controllers/cards');
const { dislikeCard } = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', celebrate(createCardValidation), createCard);
cardsRouter.delete('/:cardId', celebrate(deleteCardValidation), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate(likeCardValidation), likeCard);
cardsRouter.delete('/:cardId/likes', celebrate(dislikeCardValidation), dislikeCard);

module.exports = cardsRouter;
