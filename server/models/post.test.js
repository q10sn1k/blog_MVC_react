const assert = require('assert');
const postModel = require('./post');

describe('Post model', () => {

  // Тест получения списка всех постов
  describe('#getAllPosts()', () => {
    it('должен вернуть массив постов', (done) => {
      postModel.getAllPosts((err, posts) => {
        assert.ifError(err);
        assert.ok(Array.isArray(posts));
        done();
      });
    });
  });

  // Тест создания нового поста
  describe('#createPost()', () => {
    it('должен создать новый пост', (done) => {
      const title = 'New post';
      const content = 'Lorem ipsum dolor sit amet';

      postModel.createPost(title, content, (err, postId) => {
        assert.ifError(err);
        assert.ok(postId > 0);

        // Очистка созданной записи после выполнения теста
        postModel.deletePost(postId, (err, affectedRows) => {
          assert.ifError(err);
          assert.strictEqual(affectedRows, 1);
          done();
        });
      });
    });
  });

    // Тест обновления поста
  describe('#updatePost()', () => {
    it('должен обновить пост', (done) => {
      const title = 'Updated post';
      const content = 'Lorem ipsum dolor sit amet';

      // Получение списка постов
      postModel.getAllPosts((err, posts) => {
        assert.ifError(err);

        // Проверка, что список не пустой
        assert.ok(posts.length > 0, 'Post list should not be empty');

        // Получение ID первого поста из списка
        const postId = posts[0].id;

        // Обновление поста с полученным ID
        postModel.updatePost(postId, title, content, (err, affectedRows) => {
          assert.ifError(err);
          assert.strictEqual(affectedRows, 1);

          // Проверка, что пост был обновлен
          postModel.getPostById(postId, (err, post) => {
            assert.ifError(err);
            assert.strictEqual(post.title, title);
            assert.strictEqual(post.content, content);

            // Откат изменений после выполнения теста
            postModel.updatePost(postId, posts[0].title, posts[0].content, (err, affectedRows) => {
              assert.ifError(err);
              assert.strictEqual(affectedRows, 1);
              done();
            });
          });
        });
      });
    });
  });


  // Тест удаления поста
  describe('#deletePost()', () => {
    it('должен удалить пост', (done) => {
      postModel.createPost('Test post', 'Lorem ipsum dolor sit amet', (err, postId) => {
        assert.ifError(err);

        // Удаление созданной записи
        postModel.deletePost(postId, (err, affectedRows) => {
          assert.ifError(err);
          assert.strictEqual(affectedRows, 1);
          done();
        });
      });
    });
  });
});
