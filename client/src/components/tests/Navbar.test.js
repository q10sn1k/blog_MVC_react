import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  test('содержит ссылку на главную страницу', () => {
    render(
      <BrowserRouter basename="/">
        <Navbar />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole('link', { name: 'Блог' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  test('содержит ссылку на страницу создания поста', () => {
    render(
      <BrowserRouter basename="/">
        <Navbar />
      </BrowserRouter>
    );
    const createPostLink = screen.getByRole('link', { name: 'Создать пост' });
    expect(createPostLink).toBeInTheDocument();
    expect(createPostLink.getAttribute('href')).toBe('/create-post');
  });

  test('содержит ссылку на страницу регистрации', () => {
    render(
      <BrowserRouter basename="/">
        <Navbar />
      </BrowserRouter>
    );
    const registerLink = screen.getByRole('link', { name: 'Регистрация' });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute('href')).toBe('/register');
  });

  test('содержит ссылку на страницу входа', () => {
    render(
      <BrowserRouter basename="/">
        <Navbar />
      </BrowserRouter>
    );
    const loginLink = screen.getByRole('link', { name: 'Вход' });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute('href')).toBe('/login');
  });
});
