// подключили экспресс
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express(); // создали приложение методом экспресс
const router = require('./routes');

// подключаем mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*app.use((req, res, next) => {
  req.user = { id: '64358db832b86e2c13a3a81f' };
  next();
});*/

//ТУТ БУДУТ ТОЧКИ ВХОДА ДЛЯ РОУТЕРОВ
app.use(router);

// подключили приложение к порту 3000
app.listen(PORT, () => {
  // листен - метод чтобы понять с какого сервера надо принимать сообщения
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Connected to the port: ${PORT}`);
});
