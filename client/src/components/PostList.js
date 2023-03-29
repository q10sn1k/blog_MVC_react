import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
          setError(null);
        } else {
          setError(`Ошибка загрузки постов: ${data.message}`);
        }
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
        setError('Ошибка загрузки постов. Пожалуйста, попробуйте еще раз.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      <h2>Список постов</h2>
      {error ? (
        <p className="post-list__error">{error}</p>
      ) : (
        posts.map((post) => (
          <div className="post-list__item" key={post.id}>
            <h3 className="post-list__title">{post.title}</h3>
            <p className="post-list__content">{post.content.substring(0, 100)}...</p>
            <Link className="post-list__read-more" to={`api/posts/${post.id}`}>
              Читать далее
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;