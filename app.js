const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const app = express();
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('./errors/notfound-err');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(), //скорее всего тут будет еще регулярное выражение
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.use(auth);
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Такого адреса не существует'));
});

app.use(errors());

//централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Произошла ошибка в работе сервера.' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Connected to the port: ${PORT}`);
});
