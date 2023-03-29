const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const httpMocks = require('node-mocks-http');
const userModel = require('../models/user');
const userController = require('../controllers/userController');

describe('userController', function () {
  this.timeout(5000);

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      },
    });
    const res = httpMocks.createResponse();

    sinon.stub(userModel, 'createUser').resolves(1);

    await userController.createUser(req, res);
    const jsonResponse = res._getJSONData();
    expect(res.statusCode).to.equal(201);
    expect(jsonResponse).to.have.property('message').that.equals('Пользователь успешно создан');
    expect(jsonResponse).to.have.property('userId').that.equals(1);
  });

  it('should return a user by id', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();

    const user = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };

    sinon.stub(userModel, 'getUserById').resolves(user);

    await userController.getUserById(req, res);
    const jsonResponse = res._getJSONData();
    expect(res.statusCode).to.equal(200);
    expect(jsonResponse).to.deep.equal(user);
  });

  it('should return a user by email', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      params: { email: 'test@example.com' },
    });
    const res = httpMocks.createResponse();

    const user = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };

    sinon.stub(userModel, 'getUserByEmail').resolves(user);

    await userController.getUserByEmail(req, res);
    const jsonResponse = res._getJSONData();
    expect(res.statusCode).to.equal(200);
    expect(jsonResponse).to.deep.equal(user);
  });

  });

