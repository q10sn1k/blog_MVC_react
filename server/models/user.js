const db = require('../db');

// Создание пользователя
exports.createUser = (username, email, password, callback) => {
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.insertId);
  });
};

// Получение пользователя по ID
exports.getUserById = (userId, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};

// Получение пользователя по email
exports.getUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};
