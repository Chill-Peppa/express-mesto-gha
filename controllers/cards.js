const Card = require('../models/card');
const { ERROR, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/constants');

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
        return;
      }
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.send(card);

      if (!card) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Карточка с указанным id не найдена.',
        });
      }
    })
    .catch(() => {
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Передан несуществующий id карточки.',
        });
      }

      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR).send({
          message: 'Введен некорректный id.',
        });
        return;
      }
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({
          message: 'Передан несуществующий id карточки.',
        });
      }

      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR).send({
          message: 'Введен некорректный id.',
        });
        return;
      }
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
