const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth Middleware', () => {
  it('should return an error if no token is provided', (done) => {
    chai.request(app)
      .get('/protected-route')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').equal('Необходима авторизация');
        done();
      });
  });

  it('should return an error if invalid token is provided', (done) => {
    const token = jwt.sign({ userId: 123 }, 'invalid-secret', { expiresIn: '1h' });

    chai.request(app)
      .get('/protected-route')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').equal('Необходима авторизация');
        done();
      });
  });

  it('should allow access if valid token is provided', (done) => {
    const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET, { expiresIn: '1h' });

    chai.request(app)
      .get('/protected-route')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Доступ разрешен');
        done();
      });
  });
});
