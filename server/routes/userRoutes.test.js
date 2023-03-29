const request = require('supertest');
const expect = require('chai').expect;
const { app, startServer, stopServer } = require('../app');
const userRoutes = require('../routes/userRoutes');

const TIMEOUT = 10000; // 10 seconds

const testUser = {
  username: 'TestUser',
  email: 'testuser@example.com',
  password: 'testpassword',
};

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

  // Test for user registration
  describe('POST /api/users/register', function () {
    this.timeout(TIMEOUT);

    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send(testUser);

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Пользователь успешно создан');
      expect(response.body.userId).to.be.a('number');
    });
  });

  // Test for getting a user by ID
  describe('GET /api/users/:id', function () {
    this.timeout(TIMEOUT);

    let userId;
    before(async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send(testUser);

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

  // Test for getting a user by email
  describe('GET /api/users/email/:email', function () {
    this.timeout(TIMEOUT);

    let userEmail;
    before(async () => {
      // Удаление существующего пользователя с тем же адресом электронной почты
      await request(app)
        .delete('/api/users/email')
        .send({ email: testUser.email });

      // Создание нового пользователя
      await request(app)
        .post('/api/users/register')
        .send(testUser);

      userEmail = testUser.email;
    });

    it('should get a user by email', async () => {
      const response = await request(app).get(`/api/users/email/${userEmail}`);

      console.log(response.body); // Добавить вывод объекта пользователя

      expect(response.status).to.equal(200);
      expect(response.body.username).to.equal('TestUser');
      expect(response.body.email).to.equal('testuser@example.com');
    });

    it('should return 404 when user not found by email', async () => {
      const nonExistentEmail = 'nonexistent@example.com';
      const response = await request(app).get(`/api/users/email/${nonExistentEmail}`);

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('User not found');
    });
  });

    // Test for user authentication
  describe('POST /api/users/login', function () {
    this.timeout(TIMEOUT);

    let loginCredentials;
    before(async () => {
      const newUser = {
        username: 'TestUser',
        email: 'testuser@example.com',
        password: 'testpassword',
      };

      await request(app)
        .post('/api/users/register')
        .send(newUser);

      loginCredentials = {
        email: newUser.email,
        password: newUser.password,
      };
    });

    it('should authenticate a user and return a token', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send(loginCredentials);

      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a('string');
    });

    it('should return 401 when email or password is incorrect', async () => {
      const invalidCredentials = {
        email: 'testuser@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(invalidCredentials);

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Invalid email or password');
    });
  });
});

