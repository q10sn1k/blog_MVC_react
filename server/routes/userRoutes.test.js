const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('User Routes', function () {
  let createdUserId;

  // Создайте пользователя перед выполнением тестов
  before(async () => {
    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    };
    const res = await request(app).post('/api/users/register').send(newUser);
    createdUserId = res.body.userId;
  });

  // Получение пользователя по ID
  it('should get a user by id', async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('id').equal(createdUserId);
    expect(res.body).to.have.property('username').equal('testuser');
    expect(res.body).to.have.property('email').equal('testuser@example.com');
  });

  it('should return a user by email', async () => {
    const res = await request(app).get('/api/users/email/testuser@example.com');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('username');
    expect(res.body).to.have.property('email');
    expect(res.body).to.have.property('password');
  });

  it('should authenticate a user', async () => {
    const userCredentials = {
      email: 'testuser@example.com',
      password: 'testpassword',
    };

    const res = await request(app)
      .post('/api/users/login')
      .send(userCredentials);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Аутентификация прошла успешно');
    expect(res.body).to.have.property('userId');
  });

  it('should return 401 for incorrect email or password', async () => {
    const userCredentials = {
      email: 'testuser@example.com',
      password: 'wrongpassword',
    };

    const res = await request(app)
      .post('/api/users/login')
      .send(userCredentials);

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Неверный email или пароль');
  });
});
