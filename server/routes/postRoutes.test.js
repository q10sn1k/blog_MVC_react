const request = require('supertest');
const expect = require('chai').expect;
const { app, startServer, stopServer } = require('../app');
const postRoutes = require('../routes/postRoutes');

const TIMEOUT = 10000; // 10 seconds

describe('API tests', function () {
  this.timeout(TIMEOUT);

  before(function (done) {
    startServer();
    done();
  });

  after(function (done) {
    stopServer();
    done();
  });
  // app.use('/api/posts', postRoutes);

  describe('POST /api/posts', function () {
    this.timeout(TIMEOUT);

    it('should create a new post and return its id', async () => {
      const response = await request(app)
          .post('/api/posts')
          .send({title: 'Test Post', content: 'Test Content'});

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Post created');
      expect(response.body.postId).to.be.a('number');
    });
  });

  describe('GET /api/posts', function () {
    this.timeout(TIMEOUT);
    it('should return a list of posts', async () => {
      const response = await request(app).get('/api/posts');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

  describe('GET /api/posts/:id', function () {
  this.timeout(TIMEOUT);

  let postId;
  before(async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post', content: 'Test Content' });

    postId = response.body.postId;
  });

  it('should return a post by id', async () => {
    const response = await request(app).get(`/api/posts/${postId}`);

    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(postId);
  });

    it('should return 404 when post not found', async () => {
      const postId = 999;
      const response = await request(app).get(`/api/posts/${postId}`);

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('Post not found');
    });
  });

  describe('PUT /api/posts/:id', function () {
  this.timeout(TIMEOUT);

  let postId;
  before(async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post', content: 'Test Content' });

    postId = response.body.postId;
  });

  it('should update a post and return the number of affected rows', async () => {
    const updatedPost = {title: 'Updated Post', content: 'Updated Content'};
    const response = await request(app)
      .put(`/api/posts/${postId}`)
      .send(updatedPost);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Post updated');
    expect(response.body.affectedRows).to.equal(1);
  });

    it('should return 404 when updating a non-existent post', async () => {
      const postId = 999;
      const updatedPost = {title: 'Updated Post', content: 'Updated Content'};
      const response = await request(app)
          .put(`/api/posts/${postId}`)
          .send(updatedPost);

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('Post not found');
    });
  });

  describe('DELETE /api/posts/:id', function () {
  this.timeout(TIMEOUT);

  let postId;
  before(async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post', content: 'Test Content' });

    postId = response.body.postId;
  });

  it('should delete a post and return the number of affected rows', async () => {
    const response = await request(app).delete(`/api/posts/${postId}`);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Post deleted');
    expect(response.body.affectedRows).to.equal(1);
  });

    it('should return 404 when deleting a non-existent post', async () => {
      const postId = 999;
      const response = await request(app).delete(`/api/posts/${postId}`);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('Post not found');
    });
  });
});

