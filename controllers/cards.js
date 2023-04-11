const Card = require('../models/card');

const createCard = (req, res) => {
  const { id } = req.user;
  const { link } = req.body;
  Card.create({
    link,
    owner: id,
  })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id).then((card) => {
    res.send(card).catch((err) => {
      res.send(err);
    });
  });
};

module.exports = {
  createCard,
  getCard,
};
