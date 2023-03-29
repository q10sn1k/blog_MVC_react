import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      alert('Пароли не совпадают');
      return;
    }

    //....
   try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Успешная регистрация! Пожалуйста, войдите.');
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
        window.location('/login');
        // navigate('/login');
      } else {
        alert(`Ошибка регистрации: ${data.message}`);
      }
    } catch (error) {
      console.error('Ошибка при регистрации: ', error);
      alert('Ошибка регистрации. Пожалуйста, попробуйте еще раз.');
    }

    //....

    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    navigate('/login');
  };

  return (
    <div className="register">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Имя пользователя</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="passwordConfirmation">Подтверждение пароля</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
