const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

// Загрузка переменных среды
dotenv.config();

// Использование CORS
app.use(cors());

// Парсинг JSON-запросов
app.use(express.json());

// Подключение роутера для модели Post
const postRouter = require('./routes/postRoutes');
app.use('/posts', postRouter);

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
