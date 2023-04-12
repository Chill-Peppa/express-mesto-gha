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

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true }
  ).then((card) => {
    res.send(card);
  });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true }
  ).then((card) => {
    res.send(card);
  });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
