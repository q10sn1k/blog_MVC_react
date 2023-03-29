const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Регистрация нового пользователя
router.post('/register', userController.createUser);

// Получение пользователя по ID
router.get('/:id', userController.getUserById);

// Получение пользователя по email
router.get('/email/:email', userController.getUserByEmail);

// Аутентификация пользователя
router.post('/login', userController.authenticateUser);

module.exports = router;
