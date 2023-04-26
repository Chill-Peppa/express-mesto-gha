const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/notfound-err');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Такого адреса не существует'));
});

//для дефолтной ошибки
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
