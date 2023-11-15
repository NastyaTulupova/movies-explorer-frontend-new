import React from "react";
import Form from "../Form/Form";

function Register({ user }) {
  return (
    <Form
      title="Добро пожаловать!"
      button="Зарегистрироваться"
      question="Уже зарегистрированы?"
      redirect="/signin"
      link="Войти"
    >
      <div className="form__item">
        <p className="form__text">Имя</p>
        <input type="text" className="form__input" value={user.name} required />
        <p className="form__error-text">Что-то пошло не так...</p>
      </div>

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
        <input
          type="password"
          className="form__input form__input_color"
          defaultValue="••••••••••••••"
          required
        />
        <p className="form__error-text form__error-text_visible">
          Что-то пошло не так...
        </p>
      </div>
    </Form>
  );
}

export default Register;
