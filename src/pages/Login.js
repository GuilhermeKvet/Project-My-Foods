import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const SIX = 6;

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const validatedLogin = () => {
      const emailRegex = /\S+@\S+\.\S+/;
      if (emailRegex.test(email) && password.length > SIX) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    };
    validatedLogin();
  }, [password, email]);

  const saveData = () => {
    const infos = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(infos));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
    history.push('/foods');
  };

  return (
    <form>
      <label htmlFor="login-id">
        Login
        <input
          placeholder="Seu e-mail"
          name="email"
          id="login-id"
          value={ email }
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          placeholder="Sua senha"
          type="password"
          name="password"
          id="password"
          value={ password }
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisable }
        onClick={ () => saveData() }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default Login;
