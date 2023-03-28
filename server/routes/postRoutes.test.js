const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const db = require('../config/db');
const expect = chai.expect;
const http = require('http');

chai.use(chaiHttp);

describe('POST /api/posts', () => {
  let server;

  before((done) => {
    server = http.createServer(app);
    server.listen(0, done);
  });

  after((done) => {
    server.close(done);
  });

  beforeEach((done) => {
    db.query('TRUNCATE TABLE posts', done);
  });

  it('should create a new post', (done) => {
    chai
      .request(server)
      .post('/api/posts')
      .send({ title: 'Test Post', content: 'This is a test post' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('content');
        expect(res.body.title).to.equal('Test Post');
        expect(res.body.content).to.equal('This is a test post');
        done();
      });
  });

  it('should return a list of all posts', (done) => {
    chai
      .request(server)
      .get('/api/posts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});
