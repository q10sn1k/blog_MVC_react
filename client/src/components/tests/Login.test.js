import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Login';
import {BrowserRouter} from "react-router-dom";

describe('Login', () => {
  test('содержит форму входа', () => {
    render(
      <BrowserRouter>
      <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText('Email:');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText('Пароль:');
    expect(passwordInput).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: 'Войти' });
    expect(submitButton).toBeInTheDocument();
  });

});
