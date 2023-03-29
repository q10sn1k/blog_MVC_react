const postModel = require('../models/post');

// Получение списка всех постов
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await postModel.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

// Получение поста по ID
exports.getPostById = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await postModel.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// Создание нового поста
exports.createPost = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const postId = await postModel.createPost(title, content);
    res.status(201).json({ message: 'Post created', postId });
  } catch (err) {
    next(err);
  }
};

// Обновление поста
exports.updatePost = async (req, res, next) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const affectedRows = await postModel.updatePost(postId, title, content);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post updated', affectedRows });
  } catch (err) {
    next(err);
  }
};

// Удаление поста
exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const affectedRows = await postModel.deletePost(postId);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted', affectedRows });
  } catch (err) {
    next(err);
  }
};
