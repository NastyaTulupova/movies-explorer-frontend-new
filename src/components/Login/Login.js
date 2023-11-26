import React from "react";

import { Navigate, Link } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import { useState } from "react";
import logoSite from "../../images/logoSite.svg";

function Login({ handleLogin, loggedIn, errorMessage }) {
  /* const [values, errors, isValid, handleChange] = useValidateForm();

  function handleSubmit(evt) {
  evt.preventDefault();
  const {email, password} = values;
  handleLogin({email, password});
  }*/

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name === "email") {
      if (!isEmail(value)) {
        target.setCustomValidity("Некорректный email");
      } else {
        target.setCustomValidity("");
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleLogin(values);
  };

  loggedIn && <Navigate to="/movies" replace />;

  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link-logo">
          <img className="form__logo" alt="Логотип сайта" src={logoSite} />
        </Link>
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form__form" onSubmit={handleSubmit}>
          <div className="form__items">
            <div className="form__item">
              <p className="form__text">E-mail</p>
              <input
                type="email"
                name="email"
                className={`form__input ${
                  errors.email ? "form__input_color" : ""
                }`}
                value={values.email || ""}
                onChange={handleChange}
                pattern="^.+@.+\..+$"
                required
              />
              <p
                className={`form__error-text ${
                  errors.email ? "form__error-text_visible " : ""
                }`}
              >
                {errors.email}
              </p>
            </div>

            <div className="form__item">
              <p className="form__text">Пароль</p>
              <input
                type="password"
                name="password"
                className={`form__input ${
                  errors.password ? "form__input_color" : ""
                }`}
                value={values.password || ""}
                minLength="4"
                onChange={handleChange}
                required
              />
              <p
                className={`form__error-text ${
                  errors.password ? "form__error-text_visible " : ""
                }`}
              >
                {errors.password}
              </p>
            </div>

            <div className="form__button-area">
            <p className="form__error-server">{errorMessage || ""}</p>
            <button
              type="submit"
              className={`form__button ${
                !isValid ? "form__button_disabled" : ""
              }`}
            >
              Войти
            </button>
            </div>
          </div>
        </form>
        <span className="form__question">
          Ещё не зарегистрированы?
          <Link to="/signup" className="form__link">
            Регистрация
          </Link>
        </span>
      </div>
    </section>
  );
}

export default Login;
