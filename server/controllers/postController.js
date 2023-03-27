const db = require('../db');

// Получение списка всех постов
exports.getPosts = (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Ошибка при получении постов:', err);
      res.status(500).send('Ошибка сервера');
    } else {
      res.status(200).json(results);
    }
  });
};

// Получение поста по ID
exports.getPostById = (req, res) => {
  const postId = req.params.postId;
  db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) {
      console.error('Ошибка при получении поста:', err);
      res.status(500).send('Ошибка сервера');
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Создание нового поста
exports.createPost = (req, res) => {
  const { title, content } = req.body;
  db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, results) => {
    if (err) {
      console.error('Ошибкшибка при создании поста:', err);
      res.status(500).send('Ошибка сервера');
    } else {
      res.status(201).json({ message: 'Пост успешно создан', insertId: results.insertId });
    }
  });
};

// Обновление поста
exports.updatePost = (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId], (err, results) => {
    if (err) {
      console.error('Ошибка при обновлении поста:', err);
      res.status(500).send('Ошибка сервера');
    } else {
      res.status(200).json({ message: 'Пост успешно обновлен', affectedRows: results.affectedRows });
    }
  });
};

// Удаление поста
exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  db.query('DELETE FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) {
      console.error('Ошибка при удалении поста:', err);
      res.status(500).send('Ошибка сервера');
    } else {
      res.status(200).json({ message: 'Пост успешно удален', affectedRows: results.affectedRows });
    }
  });
};