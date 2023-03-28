const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

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
