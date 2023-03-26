import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Здесь можно сохранить токен доступа, полученный от сервера, в localStorage или другом хранилище.
        localStorage.setItem('accessToken', data.accessToken);
        alert('Успешный вход!');
        navigate('/');
      } else {
        alert(`Ошибка входа: ${data.message}`);
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Ошибка входа. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__group">
          <label className="login-form__label" htmlFor="email">Email: </label>
          <input
            id="email"
            className="login-form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form__group">
          <label className="login-form__label" htmlFor="password">Пароль: </label>
          <input
            id="password"
            className="login-form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-form__submit" type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
