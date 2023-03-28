const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('./app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('App', () => {
  let server;

  before((done) => {
    server = app.listen(3000, done);
  });

  after((done) => {
    server.close(done);
  });

  it('should return a 404 error for undefined routes', (done) => {
    chai.request(app)
      .get('/undefined-route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
