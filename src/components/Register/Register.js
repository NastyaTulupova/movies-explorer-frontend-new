import React from "react";
import isEmail from 'validator/es/lib/isEmail';
import { useState } from 'react';
import logoSite from "../../images/logoSite.svg";
import {Link, Navigate, useLocation} from "react-router-dom";
import useValidation from "../../hooks/useValidation";

function Register({ handleRegister, errorMessage}) {
const {values, errors, isValid, handleChange} = useValidation();
//const {name, email, password} = values;
//const target = evt.target

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleRegister(values);
  };

  return (

          <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link-logo">
          <img className="form__logo" alt="Логотип сайта" src={logoSite} />
        </Link>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form className="form__form" onSubmit={handleSubmit}>
          <div className="form__items">
      <div className="form__item">
        <p className="form__text">Имя</p>
        <input 
        type="text"
        name="name" 
        className={`form__input ${errors.name ? "form__input_color" : ""}`}
        value={values.name || ''} 
        onChange={handleChange}
        minLength='2'
        maxLength='30'
        pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$'
        required />
         <p className={`form__error-text ${errors.name ? "form__error-text_visible " : ""}`}>{errors.name}</p>
      </div>

      <div className="form__item">
        <p className="form__text">E-mail</p>
        <input
          type="email"
          name="email"
          className={`form__input ${errors.email ? "form__input_color" : ""}`}
          value={values.email || ""}
          onChange={handleChange}
          pattern='^.+@.+\..+$'
          required
        />
        <p className={`form__error-text ${errors.email? "form__error-text_visible " : ""}`}>{errors.email}</p>
      </div>

      <div className="form__item">
        <p className="form__text">Пароль</p>
        <input
          type="password"
          name="password"
          className={`form__input ${errors.password ? "form__input_color" : ""}`}
          value={values.password || ""}
          onChange={handleChange}
          minLength='4'
          required
        />
        <p className={`form__error-text ${errors.password? "form__error-text_visible " : ""}`}>{errors.password}</p>
      </div>
      <div className="form__button-area">
      <p className="form__error-server">{errorMessage || ""}</p>
      <button
            type="submit"
            className= {`form__button form__button_signup ${!isValid ? "form__button_disabled": ""}`}
          >Зарегистрироваться
          </button>
          </div>
      </div>
      </form>
        <span className="form__question">
        Уже зарегистрированы? 
          <Link to="/signin" className="form__link">
            Войти
          </Link>
        </span>
      </div>
    </section>
  );
}

export default Register;
