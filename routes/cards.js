const cardsRouter = require('express').Router();
const { createCard } = require('../controllers/cards');
const { getCard } = require('../controllers/cards');

cardsRouter.post('/:id', getCard);
cardsRouter.post('/', createCard);

module.exports = cardsRouter;
