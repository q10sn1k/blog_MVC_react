import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__brand navbar__links">
        <Link to="/">Блог</Link>
      </div>
      <div className="navbar__links">
        <Link to="/create-post">Создать пост</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/login">Вход</Link>
      </div>
    </nav>
  );
};

export default Navbar;
