const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Регистрация нового пользователя
router.post('/register', userController.register);

// Авторизация пользователя
router.post('/login', userController.login);

// Получение данных текущего пользователя
router.get('/me', authMiddleware, userController.getCurrentUser);

module.exports = router;
