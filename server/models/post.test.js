const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../config/db');
const postModel = require('../models/post');

describe('postModel', function () {
  this.timeout(5000);

  afterEach(() => {
    sinon.restore();
  });

  it('should return all posts', (done) => {
    const postList = [
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' },
    ];
    sinon.stub(db, 'query').callsFake((query, callback) => {
      callback(null, postList);
    });

    postModel.getAllPosts().then((posts) => {
      expect(posts).to.deep.equal(postList);
      done();
    }).catch(done);
  });

  it('should return a post by id', (done) => {
    const postId = 1;
    const post = { id: postId, title: 'Post 1', content: 'Content 1' };
    sinon.stub(db, 'query').callsFake((query, postId, callback) => {
      callback(null, [post]);
    });

    postModel.getPostById(postId).then((retrievedPost) => {
      expect(retrievedPost).to.deep.equal(post);
      done();
    }).catch(done);
  });

  it('should create a new post', (done) => {
    const newPost = { title: 'New Post', content: 'New Content' };
    const insertId = 3;
    sinon.stub(db, 'query').callsFake((query, params, callback) => {
      callback(null, { insertId });
    });

    postModel.createPost(newPost.title, newPost.content).then((createdPostId) => {
      expect(createdPostId).to.equal(insertId);
      done();
    }).catch(done);
  });

  it('should update a post', (done) => {
    const postId = 1;
    const updatedPost = { title: 'Updated Post', content: 'Updated Content' };
    const affectedRows = 1;
    sinon.stub(db, 'query').callsFake((query, params, callback) => {
      callback(null, { affectedRows });
    });

    postModel.updatePost(postId, updatedPost.title, updatedPost.content).then((result) => {
      expect(result).to.equal(affectedRows);
      done();
    }).catch(done);
  });

  it('should delete a post', (done) => {
    const postId = 1;
    const affectedRows = 1;
    sinon.stub(db, 'query').callsFake((query, postId, callback) => {
      callback(null, { affectedRows });
    });

    postModel.deletePost(postId).then((result) => {
      expect(result).to.equal(affectedRows);
      done();
    }).catch(done);
  });

});
