import React, {useState} from 'react';
import {authorize} from '../utils/auth';

const Login = ({onLogin, history}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    authorize(email, password)
      .then(data => {
        if (data.token) {
          setEmail('');
          setPassword('');
          localStorage.setItem('token', data.token);
          onLogin(true);
          history.push('/');
        }
      })
      .catch((e) => {
        console.log(e);
        onLogin(false);
      });
  }

  return (
    <main className="auth page__auth auth_type_register">
      <form onSubmit={handleLogin} className="auth__form" method="post">
        <h2 className="auth__heading">Вход</h2>
        <div className="auth__input-wrapper">
          <input onChange={handleEmailChange} className="auth__input" type="email" placeholder="Email" required/>
        </div>
        <div className="auth__input-wrapper">
          <input onChange={handlePasswordChange} className="auth__input" type="password" maxLength="20" minLength="8"
                 placeholder="Пароль" required/>
        </div>
        <button className="auth__save-button">Войти</button>
      </form>
    </main>
  );
};

export default Login;
