const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Создание нового пользователя
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hash,
    };
    db.query('INSERT INTO users SET ?', newUser, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
      const userId = results.insertId;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(201).json({ message: 'Пользователь успешно создан', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Аутентификация пользователя
exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', email, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ message: 'Аутентификация прошла успешно', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
