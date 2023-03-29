const userModel = require('../models/user');
const bcrypt = require('bcrypt');

// Создание нового пользователя
exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userId = await userModel.createUser(username, email, password);
    res.status(201).json({ message: 'Пользователь успешно создан', userId });
  } catch (err) {
    next(err);
  }
};

// Получение пользователя по ID
exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Получение пользователя по email
exports.getUserByEmail = async (req, res, next) => {
  const email = req.params.email;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Аутентификация пользователя
// exports.authenticateUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.authenticateUser(email, password);
//     if (!user) {
//       return res.status(401).json({ message: 'Неверный email или пароль' });
//     }
//     res.status(200).json({ message: 'Аутентификация прошла успешно', userId: user.id });
//   } catch (err) {
//     next(err);
//   }
// };

exports.authenticateUser = async (email, password) => {
  try {
    const user = await exports.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

