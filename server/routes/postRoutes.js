const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Получение списка всех постов
router.get('/', postController.getAllPosts);

// Получение поста по ID
router.get('/:id', postController.getPostById);

// Создание нового поста
router.post('/', postController.createPost);

// Обновление поста
router.put('/:id', postController.updatePost);

// Удаление поста
router.delete('/:id', postController.deletePost);

module.exports = router;
