const request = require('supertest');
const express = require('express');
const postRoutes = require('../routes/postRoutes');
const app = express();

// before(function() {
//   this.timeout(10000); // Устанавливаем таймаут в 10 секунд
// });

app.use('/api/posts', postRoutes);

describe('POST /api/posts', () => {

  it('should create a new post and return its id', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post', content: 'Test Content' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Post created');
    expect(response.body.postId).toBeDefined();
  });
});

describe('GET /api/posts', () => {
  it('should return a list of posts', async () => {
    const response = await request(app).get('/api/posts');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/posts/:id', () => {
  it('should return a post by id', async () => {
    const postId = 1;
    const response = await request(app).get(`/api/posts/${postId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(postId);
  });

  it('should return 404 when post not found', async () => {
    const postId = 999;
    const response = await request(app).get(`/api/posts/${postId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Post not found');
  });
});

describe('PUT /api/posts/:id', () => {
  it('should update a post and return the number of affected rows', async () => {
    const postId = 1;
    const updatedPost = { title: 'Updated Post', content: 'Updated Content' };
    const response = await request(app)
      .put(`/api/posts/${postId}`)
      .send(updatedPost);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post updated');
    expect(response.body.affectedRows).toBe(1);
  });

  it('should return 404 when updating a non-existent post', async () => {
    const postId = 999;
    const updatedPost = { title: 'Updated Post', content: 'Updated Content' };
    const response = await request(app)
      .put(`/api/posts/${postId}`)
      .send(updatedPost);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Post not found');
  });
});

describe('DELETE /api/posts/:id', () => {
  it('should delete a post and return the number of affected rows', async () => {
    const postId = 1;
    const response = await request(app).delete(`/api/posts/${postId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post deleted');
    expect(response.body.affectedRows).toBe(1);
  });

  it('should return 404 when deleting a non-existent post', async () => {
    const postId = 999;
    const response = await request(app).delete(`/api/posts/${postId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Post not found');
  });
});
