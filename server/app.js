const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const db = require('./config/db');

const app = express();

// Подключение к базе данных
db.connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршруты
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err);
  res.status(500).send('Ошибка сервера');
});

// Запуск сервера
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
