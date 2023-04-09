// подключили экспресс
const express = require('express');

const { PORT = 3000 } = process.env;
const app = express(); // создали приложение методом экспресс

// передадим обработчик
app.listen(PORT, () => {
  // листен - метод чтобы понять с какого сервера надо принимать сообщения
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
