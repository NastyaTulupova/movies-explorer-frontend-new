import React from "react";
import { Link, useLocation } from "react-router-dom";

import logoSite from "../../images/logoSite.svg";

function Form({ title, children, button, question, redirect, link }) {
  const path = useLocation();

  return (
    <section className="form">
      <div className="form__container">
        <Link to="/" className="form__link-logo">
          <img className="form__logo" alt="Логотип сайта" src={logoSite} />
        </Link>
        <h2 className="form__title">{title}</h2>
        <form className="form__form">
          <div className="form__items">{children}</div>
          <button
            type="submit"
            className={
              path.pathname === "/signup"
                ? "form__button form__button_signup"
                : "form__button"
            }
          >
            {button}
          </button>
        </form>
        <span className="form__question">
          {question}
          <Link to={redirect} className="form__link">
            {link}
          </Link>
        </span>
      </div>
    </section>
  );
}

export default Form;
