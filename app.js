// подключили экспресс
const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express(); // создали приложение методом экспресс

// подключаем mongoose
mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('Connected to mongoose!'));

// подключили приложение к порту 3000
app.listen(PORT, () => {
  // листен - метод чтобы понять с какого сервера надо принимать сообщения
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Connected to the port: ${PORT}`);
});
