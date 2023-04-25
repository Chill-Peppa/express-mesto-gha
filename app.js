const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { ERROR_NOT_FOUND } = require('./utils/constants');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//подключаем роуты
app.post('/signin', login);
app.post('/signup', createUser);

//app.use(auth);
app.use(router);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({
    message: 'Такого адреса не существует',
  });
});

app.listen(PORT, () => {
  console.log(`Connected to the port: ${PORT}`);
});
