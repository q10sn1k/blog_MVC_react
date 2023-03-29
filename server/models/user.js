const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Создание пользователя
exports.createUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Получение пользователя по ID
exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

// Получение пользователя по email
exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

// Аутентификация пользователя
exports.authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return reject(err);
      }

      if (results.length === 0) {
        return resolve(null);
      }

      const user = results[0];
      bcrypt.compare(password, user.password, (err, passwordMatches) => {
        if (err) {
          return reject(err);
        }

        if (!passwordMatches) {
          return resolve(null);
        }

        resolve(user);
      });
    });
  });
};