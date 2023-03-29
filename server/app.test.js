const expect = require('chai').expect;
const request = require('supertest');
const app = require('./app');

describe('App', () => {
  it('should return 404 for non-existent route', async () => {
  const response = await request(app).get('/non-existent-route');
  expect(response.status).to.equal(404);
  expect(response.text).to.equal('{"message":"Not Found"}');
});



  it('should handle errors correctly', async () => {
    const response = await request(app).get('/test-error');
    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal('An error occurred on the server');
  });
});
