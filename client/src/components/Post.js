import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';

const Post = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
        const data = await response.json();

        if (response.ok) {
          setPost(data.post);
        } else {
          alert(`Ошибка загрузки поста: ${data.message}`);
        }
      } catch (error) {
        console.error('Ошибка при загрузке поста:', error);
        alert('Ошибка загрузки поста. Пожалуйста, попробуйте еще раз.');
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Загрузка поста...</div>;
  }

  return (
    <div className="post">
      <h2 className="post__title">{post.title}</h2>
      <p className="post__content">{post.content}</p>
      <button className="post__back-btn" onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default Post;
