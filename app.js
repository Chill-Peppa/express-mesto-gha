const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');

const app = express();
const signRouter = require('./routes/sign');
const router = require('./routes');
const { auth } = require('./middlewares/auth');
const { pageNotFound } = require('./middlewares/pageNotFound');
const { centralErrorHandler } = require('./middlewares/centralErrorHandler');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// тут роуты авторизации и регистрации
app.use(signRouter);

app.use(auth);
app.use(router);

app.use(pageNotFound); // если введен несуществующий адрес

app.use(errors());

app.use(centralErrorHandler); // централизованный обработчик ошибок

app.listen(PORT);
