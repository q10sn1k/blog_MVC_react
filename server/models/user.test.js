const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../config/db');
const userModel = require('../models/user');

describe('userModel', function () {
  this.timeout(5000);

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new user', (done) => {
    const newUser = { username: 'User1', email: 'user1@example.com', password: 'password' };
    const insertId = 1;
    sinon.stub(db, 'query').callsFake((query, params, callback) => {
      callback(null, { insertId });
    });

    userModel.createUser(newUser.username, newUser.email, newUser.password).then((createdUserId) => {
      expect(createdUserId).to.equal(insertId);
      done();
    }).catch(done);
  });

  it('should get a user by id', (done) => {
    const userId = 1;
    const user = { id: userId, username: 'User1', email: 'user1@example.com', password: 'password' };
    sinon.stub(db, 'query').callsFake((query, userId, callback) => {
      callback(null, [user]);
    });

    userModel.getUserById(userId).then((retrievedUser) => {
      expect(retrievedUser).to.deep.equal(user);
      done();
    }).catch(done);
  });

  it('should get a user by email', (done) => {
    const email = 'user1@example.com';
    const user = { id: 1, username: 'User1', email: email, password: 'password' };
    sinon.stub(db, 'query').callsFake((query, userEmail, callback) => {
      callback(null, [user]);
    });

    userModel.getUserByEmail(email).then((retrievedUser) => {
      expect(retrievedUser).to.deep.equal(user);
      done();
    }).catch(done);
  });
});
