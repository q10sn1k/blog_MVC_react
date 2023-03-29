const request = require('supertest');
const expect = require('chai').expect;
const { app, startServer, stopServer } = require('../app');
const userRoutes = require('../routes/userRoutes');

const TIMEOUT = 10000; // 10 seconds

describe('User API tests', function () {
  this.timeout(TIMEOUT);

  before(function (done) {
    startServer();
    done();
  });

  after(function (done) {
    stopServer();
    done();
  });

  describe('POST /api/users/register', function () {
    this.timeout(TIMEOUT);

    it('should register a new user', async () => {
      const newUser = {
        username: 'TestUser',
        email: 'testuser@example.com',
        password: 'testpassword',
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(newUser);

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Пользователь успешно создан'); // Исправлено на русский язык
      expect(response.body.userId).to.be.a('number');
    });
  });

  describe('GET /api/users/:id', function () {
    this.timeout(TIMEOUT);

    let userId;
    before(async () => {
      const newUser = {
        username: 'TestUser',
        email: 'testuser@example.com',
        password: 'testpassword',
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(newUser);

      userId = response.body.userId;
    });

    it('should get a user by id', async () => {
      const response = await request(app).get(`/api/users/${userId}`);

      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(userId);
      expect(response.body.username).to.equal('TestUser');
      expect(response.body.email).to.equal('testuser@example.com');
    });

    it('should return 404 when user not found', async () => {
      const nonExistentUserId = 999;
      const response = await request(app).get(`/api/users/${nonExistentUserId}`);

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('User not found');
    });
  });
});
