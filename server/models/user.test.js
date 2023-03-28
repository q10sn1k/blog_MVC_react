const assert = require('assert');
const db = require('../config/db');
const userModel = require('../models/user');

describe('User model', () => {
  // Тестирование функции createUser
  describe('createUser', () => {
    it('Создает пользователя с заданными username, email и password', (done) => {
      userModel.createUser('testuser', 'testuser@test.com', 'testpassword', (err, userId) => {
        assert.ifError(err);
        assert.ok(userId > 0, 'ID пользователя должен быть больше нуля');
        done();
      });
    });
  });

  // Тестирование функции getUserById
  describe('getUserById', () => {
    let userId;

    before((done) => {
      // Добавление пользователя в базу данных для тестирования функции getUserById
      userModel.createUser('testuser', 'testuser@test.com', 'testpassword', (err, id) => {
        assert.ifError(err);
        userId = id;
        done();
      });
    });

    it('Возвращает пользователя с заданным ID', (done) => {
      userModel.getUserById(userId, (err, user) => {
        assert.ifError(err);
        assert.ok(user, 'Пользователь не найден');
        assert.strictEqual(user.id, userId, `ID пользователя должен быть ${userId}`);
        assert.strictEqual(user.username, 'testuser', 'Неверный username пользователя');
        assert.strictEqual(user.email, 'testuser@test.com', 'Неверный email пользователя');
        done();
      });
    });
  });

  // Тестирование функции getUserByEmail
  describe('getUserByEmail', () => {
    let userEmail;

    before((done) => {
      // Добавление пользователя в базу данных для тестирования функции getUserByEmail
      userModel.createUser('testuser', 'testuser@test.com', 'testpassword', (err) => {
        assert.ifError(err);
        userEmail = 'testuser@test.com';
        done();
      });
    });

    it('Возвращает пользователя с заданным email', (done) => {
      userModel.getUserByEmail(userEmail, (err, user) => {
        assert.ifError(err);
        assert.ok(user, 'Пользователь не найден');
        assert.strictEqual(user.email, userEmail, `Email пользователя должен быть ${userEmail}`);
        done();
      });
    });
  });

  after((done) => {
    // Удаление тестовых данных из базы данных после выполнения тестов
    db.query('DELETE FROM users WHERE email LIKE ?', ['testuser%'], (err) => {
      assert.ifError(err);
      done();
    });
  });
});
