const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

// Получение списка всех постов
router.get('/', postController.getPosts);

// Получение поста по ID
router.get('/:postId', postController.getPostById);

// Создание нового поста
router.post('/', authMiddleware, postController.createPost);

// Обновление поста
router.put('/:postId', authMiddleware, postController.updatePost);

// Удаление поста
router.delete('/:postId', authMiddleware, postController.deletePost);

module.exports = router;
