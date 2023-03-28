// Импортирование зависимостей
const assert = require('assert');
const connection = require('./db');

// Описание тестов
describe('Подключение к базе данных', () => {
  // Проверка соединения с базой данных
  it('должно подключиться к базе данных без ошибок', (done) => {
    connection.connect((err) => {
      assert.strictEqual(err, null); // Проверяем, что ошибки нет
      done(); // Завершаем тест
    });
  });

  // Проверка типа объекта соединения
  it('должно экспортироваться соединение с базой данных типа object', () => {
    assert.strictEqual(typeof connection, 'object');
  });

  // Проверка свойства state соединения
  it('должно экспортироваться соединение с базой данных', () => {
  assert.strictEqual(typeof connection, 'object'); // Проверяем, что экспортирован объект
  assert.notStrictEqual(connection, null); // Проверяем, что объект не является null
});

});
