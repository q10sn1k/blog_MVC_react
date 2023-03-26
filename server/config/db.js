const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    process.exit(1);
  } else {
    console.log('Подключение к базе данных успешно установлено');
  }
});

module.exports = connection;
