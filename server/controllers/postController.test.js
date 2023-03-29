const chai = require('chai');
const sinon = require('sinon');
const postController = require('../controllers/postController');
const postModel = require('../models/post');

const { expect } = chai;

describe('Post Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all posts', async () => {
    const posts = [
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' },
    ];

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    sinon.stub(postModel, 'getAllPosts').resolves(posts);

    await postController.getAllPosts(req, res, next);

    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.json.calledOnceWith(posts)).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it('should get a post by id', async () => {
  const post = { id: 1, title: 'Post 1', content: 'Content 1' };

  const req = {
    params: {
      id: post.id,
    },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  sinon.stub(postModel, 'getPostById').resolves(post);

  await postController.getPostById(req, res, next);

  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.json.calledOnceWith(post)).to.be.true;
  expect(next.notCalled).to.be.true;
});

it('should return 404 when post not found by id', async () => {
  const req = {
    params: {
      id: 1,
    },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  sinon.stub(postModel, 'getPostById').resolves(null);

  await postController.getPostById(req, res, next);

  expect(res.status.calledOnceWith(404)).to.be.true;
  expect(res.json.calledOnceWith({ message: 'Post not found' })).to.be.true;
  expect(next.notCalled).to.be.true;
});

it('should create a new post', async () => {
  const post = { title: 'New Post', content: 'New Content' };
  const postId = 1;

  const req = {
    body: post,
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  sinon.stub(postModel, 'createPost').resolves(postId);

  await postController.createPost(req, res, next);

  expect(res.status.calledOnceWith(201)).to.be.true;
  expect(res.json.calledOnceWith({ message: 'Post created', postId })).to.be.true;
  expect(next.notCalled).to.be.true;
});

it('should update a post', async () => {
  const postId = 1;
  const updatedPost = { title: 'Updated Post', content: 'Updated Content' };

  const req = {
    params: {
      id: postId,
    },
    body: updatedPost,
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  sinon.stub(postModel, 'updatePost').resolves(1);

  await postController.updatePost(req, res, next);

  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.json.calledOnceWith({ message: 'Post updated', affectedRows: 1 })).to.be.true;
  expect(next.notCalled).to.be.true;
});

  it('should return 404 when updating a non-existent post', async () => {
  const postId = 1;
  const updatedPost = { title: 'Updated Post', content: 'Updated Content' };

  const req = {
    params: {
      id: postId,
    },
    body: updatedPost,
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  sinon.stub(postModel, 'updatePost').resolves(0);

  await postController.updatePost(req, res, next);

  expect(res.status.calledOnceWith(404)).to.be.true;
  expect(res.json.calledOnceWith({ message: 'Post not found' })).to.be.true;
  expect(next.notCalled).to.be.true;
});

it('should delete a post', async () => {
  const postId = 1;

  const req = {
    params: {
      id: postId,
    },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  sinon.stub(postModel, 'deletePost').resolves(1);

  await postController.deletePost(req, res, next);

  expect(res.status.calledOnceWith(200)).to.be.true;
  expect(res.json.calledOnceWith({ message: 'Post deleted', affectedRows: 1 })).to.be.true;
  expect(next.notCalled).to.be.true;
});

it('should return 404 when deleting a non-existent post', async () => {
  const postId = 1;

  const req = {
    params: {
      id: postId,
    },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  sinon.stub(postModel, 'deletePost').resolves(0);

  await postController.deletePost(req, res, next);

  expect(res.status.calledOnceWith(404)).to.be.true;
  expect(res.json.calledOnceWith({ message: 'Post not found' })).to.be.true;
  expect(next.notCalled).to.be.true;
});
});
