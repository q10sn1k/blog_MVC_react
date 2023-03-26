import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
        } else {
          alert(`Ошибка загрузки постов: ${data.message}`);
        }
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
        alert('Ошибка загрузки постов. Пожалуйста, попробуйте еще раз.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      <h2>Список постов</h2>
      {posts.map((post) => (
        <div className="post-list__item" key={post.id}>
          <h3 className="post-list__title">{post.title}</h3>
          <p className="post-list__content">{post.content.substring(0, 100)}...</p>
          <Link className="post-list__read-more" to={`/posts/${post.id}`}>
            Читать далее
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
