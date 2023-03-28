const Post = require('../models/post');

// Получение списка всех постов
exports.getAllPosts = (req, res) => {
  Post.getAllPosts((err, posts) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка получения списка постов' });
    } else {
      res.json(posts);
    }
  });
};

// Получение поста по ID
exports.getPostById = (req, res) => {
  const postId = req.params.id;
  Post.getPostById(postId, (err, post) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка получения поста' });
    } else if (!post) {
      res.status(404).json({ error: 'Пост не найден' });
    } else {
      res.json(post);
    }
  });
};

// Создание нового поста
exports.createPost = (req, res) => {
  const { title, content } = req.body;
  Post.createPost(title, content, (err, postId) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка создания поста' });
    } else {
      res.status(201).json({ message: 'Пост успешно создан', postId });
    }
  });
};

// Обновление поста
exports.updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  Post.updatePost(postId, title, content, (err, affectedRows) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка обновления поста' });
    } else if (affectedRows === 0) {
      res.status(404).json({ error: 'Пост не найден' });
    } else {
      res.json({ message: 'Пост успешно обновлен' });
    }
  });
};

// Удаление поста
exports.deletePost = (req, res) => {
  const postId = req.params.id;
  Post.deletePost(postId, (err, affectedRows) => {
    if (err) {
      res.status(500).json({ error: 'Ошибка удаления поста' });
    } else if (affectedRows === 0) {
      res.status(404).json({ error: 'Пост не найден' });
    } else {
      res.json({ message: 'Пост успешно удален' });
    }
  });
};
