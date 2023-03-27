import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Здесь необходимо добавить заголовок для авторизации, если требуется
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Пост успешно создан!');
        setTitle('');
        setContent('');
        navigate('/');
      } else {
        alert(`Ошибка создания поста: ${data.message}`);
      }
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
      alert('Ошибка создания поста. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className="post-form">
      <h2>Создать новый пост</h2>
      <form onSubmit={handleSubmit}>
        <div className="post-form__group">
          <label className="post-form__label">Заголовок: </label>
          <input
            className="post-form__input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="post-form__group">
          <label className="post-form__label">Контент: </label>
          <textarea
            className="post-form__textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="post-form__submit" type="submit">Создать пост</button>
      </form>
    </div>
  );
};

export default PostForm;
