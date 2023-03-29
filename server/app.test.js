const request = require('supertest');
const { app, startServer, stopServer } = require('./app');

describe('Server Tests', () => {
  before((done) => {
    startServer();
    done();
  });

  after((done) => {
    stopServer();
    done();
  });

  it('should respond with status 200 on GET /api/posts', (done) => {
    request(app)
      .get('/api/posts')
      .expect(200, done);
  });


  it('should respond with status 200 on GET /api/users', (done) => {
    request(app)
      .get('/api/users')
      .expect(200, done);
  });

  it('should respond with status 404 on GET /api/nonexistent', (done) => {
    request(app)
      .get('/api/nonexistent')
      .expect(404, done);
  });

  it('should respond with status 500 on POST /api/users with invalid data', (done) => {
    request(app)
      .post('/api/users')
      .send({ name: '', email: 'invalid_email' })
      .expect(500, done);
  });
});
