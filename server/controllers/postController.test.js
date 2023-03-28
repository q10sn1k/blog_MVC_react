const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../config/db');
const app = require('../app');
const assert = require('assert');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Post Controller', () => {

  // Перед запуском каждого теста создаем таблицу в базе данных
  // beforeEach((done) => {
  //   db.query(`CREATE TABLE posts (
  //       id INT PRIMARY KEY AUTO_INCREMENT,
  //       title VARCHAR(255),
  //       content TEXT
  //   )`, (err, results) => {
  //     if (err) {
  //       console.error('Ошибка при создании таблицы:', err);
  //     }
  //     done();
  //   });
  // });

  // После запуска каждого теста удаляем таблицу из базы данных
  afterEach((done) => {
    db.query('DROP TABLE posts', (err, results) => {
      if (err) {
        console.error('Ошибка при удалении таблицы:', err);
      }
      done();
    });
  });

  // Тест для получения списка всех постов
  it('should return all posts', (done) => {
    chai.request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(0);
        done();
      });
  });

  // Тест для создания нового поста
  it('should create a new post', (done) => {
    chai.request(app)
      .post('/posts')
      .send({ title: 'Test Post', content: 'This is a test post' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.equal('Пост успешно создан');
        expect(res.body.insertId).to.be.a('number');
        done();
      });
  });

  // Тест для получения поста по ID
  it('should return a post by id', (done) => {
    const post = { title: 'Test Post', content: 'This is a test post' };
    db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [post.title, post.content], (err, results) => {
      if (err) {
        console.error('Ошибка при создании поста:', err);
      }
      const postId = results.insertId;
      chai.request(app)
        .get(`/posts/${postId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.be.equal(post.title);
          expect(res.body.content).to.be.equal(post.content);
          done();
        });
    });
  });

  // Тест для обновления поста по ID
it('должен обновить пост по ID', (done) => {
const post = { title: 'Test Post', content: 'This is a test post' };
db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [post.title, post.content], (err, results) => {
if (err) {
console.error('Ошибка при создании поста:', err);
}
const postId = results.insertId;
const updatedPost = { title: 'Updated Test Post', content: 'This is an updated test post' };
chai.request(app)
.put(/posts/${postId})
.send(updatedPost)
.end((err, res) => {
if (err) {
console.error('Ошибка при обновлении поста:', err);
}
expect(res).to.have.status(200);
expect(res.body.message).to.be.equal('Пост успешно обновлен');
expect(res.body.affectedRows).to.be.equal(1);
done();
});
});
});

// Тест для удаления поста по ID
it('должен удалить пост по ID', (done) => {
const post = { title: 'Test Post', content: 'This is a test post' };
db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [post.title, post.content], (err, results) => {
if (err) {
console.error('Ошибка при создании поста:', err);
}
const postId = results.insertId;
chai.request(app)
.delete(/posts/${postId})
.end((err, res) => {
if (err) {
console.error('Ошибка при удалении поста:', err);
}
expect(res).to.have.status(200);
expect(res.body.message).to.be.equal('Пост успешно удален');
expect(res.body.affectedRows).to.be.equal(1);
done();
});
});
});
});

module.exports = app;