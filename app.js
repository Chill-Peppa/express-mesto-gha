const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes');
const { ERROR_NOT_FOUND } = require('./utils/constants');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '64358db832b86e2c13a3a81f' };
  next();
});

app.use(router);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: 'Такого адреса не существует',
  });
});

app.listen(PORT, () => {
  console.log(`Connected to the port: ${PORT}`);
});
