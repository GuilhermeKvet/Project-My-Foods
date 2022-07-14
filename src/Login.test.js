import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Teste do componente Login', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Verifica se o botão é habilitado ao digitar um email válido', () => {
    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveAttribute('disabled');
    userEvent.type(screen
      .getByRole('textbox', { name: /login/i }), 'miguelgarcia21@gmail.com');
    userEvent.type(screen.getByLabelText(/senha/i), '1234567');
    expect(screen
      .getByRole('button', { name: 'Entrar' })).not.toHaveAttribute('disabled');
  });
});
