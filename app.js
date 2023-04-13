const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//миддлвэр для временного решения вопроса с регистрацией
app.use((req, res, next) => {
  req.user = { _id: '64358db832b86e2c13a3a81f' };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Connected to the port: ${PORT}`);
});
