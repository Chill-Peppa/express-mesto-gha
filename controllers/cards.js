const Card = require('../models/card');

//создать карточку
const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      res.send(err);
    });
};

//вернет все карточки
const getAllCards = (req, res) => {
  Card.find({}).then((cards) => {
    res.send(cards);
  });
};

//удалит карточку
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId).then((card) => {
    res.send(card);
  });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
};
