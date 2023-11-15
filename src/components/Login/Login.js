import React from "react";
import Form from "../Form/Form";

function Login({ user }) {
  return (
    <Form
      title="Рады видеть!"
      button="Войти"
      question="Ещё не зарегистрированы? "
      redirect="/signup"
      link="Регистрация"
    >
      <div className="form__item">
        <p className="form__text">E-mail</p>
        <input
          type="email"
          className="form__input"
          value={user.email}
          required
        />
        <p className="form__error-text">Что-то пошло не так...</p>
      </div>

      <div className="form__item">
        <p className="form__text">Пароль</p>
        <input type="password" className="form__input" required />
        <p className="form__error-text">Что-то пошло не так...</p>
      </div>
    </Form>
  );
}

export default Login;
