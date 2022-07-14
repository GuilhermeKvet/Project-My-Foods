import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente Header', () => {
  it("Verifica se a um icone de usuario e um de pesquisa", () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    userEvent.click(screen.getByRole('button', { name: /profile/i }));
    expect(history.location.pathname).toBe('/profile');

    userEvent.click(screen.getByRole('button', { name: /search\-icon/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  
  it("Verifica se exite um titulo", () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(screen.getByRole("heading", { name: /foods/i })).toBeInTheDocument();
  });
});
