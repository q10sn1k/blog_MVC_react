const db = require('../config/db');

// Получение списка всех постов
exports.getAllPosts = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Получение поста по ID
exports.getPostById = (postId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

// Создание нового поста
exports.createPost = (title, content) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Обновление поста
exports.updatePost = (postId, title, content) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Удаление поста
exports.deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM posts WHERE id = ?', [postId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};
