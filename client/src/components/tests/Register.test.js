import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Register from '../Register';

describe('Register', () => {
  test('содержит форму регистрации', () => {
    render(
      <BrowserRouter basename="/">
        <Register />
      </BrowserRouter>
    );
    const usernameInput = screen.getByLabelText('Имя пользователя');
    expect(usernameInput).toBeInTheDocument();
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText('Пароль');
    expect(passwordInput).toBeInTheDocument();
    const passwordConfirmationInput = screen.getByLabelText('Подтверждение пароля');
    expect(passwordConfirmationInput).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });
    expect(submitButton).toBeInTheDocument();
  });


});
