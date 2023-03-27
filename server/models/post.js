const db = require('../db');

// Получение списка всех постов
exports.getAllPosts = (callback) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Получение поста по ID
exports.getPostById = (postId, callback) => {
  db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};

// Создание нового поста
exports.createPost = (title, content, callback) => {
  db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.insertId);
  });
};

// Обновление поста
exports.updatePost = (postId, title, content, callback) => {
  db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.affectedRows);
  });
};

// Удаление поста
exports.deletePost = (postId, callback) => {
  db.query('DELETE FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.affectedRows);
  });
};
