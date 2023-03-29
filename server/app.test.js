const request = require('supertest');
const expect = require('chai').expect;
const app = require('./app');

describe('App', function () {
  it('should start the server on the specified port', async () => {
    const PORT = 4000;
    const res = await request(app).get('/');
    expect(res.status).to.equal(404);

    app.listen(PORT, () => {
      request(app)
        .get('/')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          app.close();
        });
    });
  });

  it('should handle server errors correctly', async () => {
    const res = await request(app).get('/invalid-path');
    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('message', 'Ошибка сервера');
  });
});
