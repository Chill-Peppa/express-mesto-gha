const cardsRouter = require('express').Router();
const { createCard } = require('../controllers/cards');
const { getAllCards } = require('../controllers/cards');
const { deleteCard } = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);

module.exports = cardsRouter;
