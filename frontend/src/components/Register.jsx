import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {register} from '../utils/auth';

const Register = ({onRegister, history}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();
    register(email, password)
      .then(data => {
        if (data) {
          onRegister(true);
          history.push('/sign-in');
        }
      })
      .catch((e) => {
        console.log(e);
        onRegister(false);
      });
  }

  return (
    <main className="auth page__auth auth_type_register">
      <form onSubmit={handleRegister} className="auth__form" method="post">
        <h2 className="auth__heading">Регистрация</h2>
        <div className="auth__input-wrapper">
          <input onChange={handleEmailChange} className="auth__input" type="email" name="email"
                 placeholder="Email" required/>
        </div>
        <div className="auth__input-wrapper">
          <input onChange={handlePasswordChange} className="auth__input" type="password" name="password" maxLength="20"
                 minLength="8" placeholder="Пароль" required/>
        </div>
        <button className="auth__save-button">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы?
        <NavLink to="/sign-in" className="auth__link" href=""> Войти</NavLink>
      </p>
    </main>
  );
};

export default Register;
