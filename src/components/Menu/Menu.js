import React from "react";
import { Link } from "react-router-dom";
import accountLogo from "../../images/logoAccount.svg";

function Menu({ isOpen, onClose, onOverlayClick }) {
  return (
    <div
      className={`menu ${isOpen ? "menu_opened" : ""}`}
      onClick={onOverlayClick}
    >
      <nav className="menu__container">
        <ul className="menu__items">
          <li className="menu__item" onClick={onClose}>
            <Link className="menu__link" to="/">
              Главная
            </Link>
          </li>
          <li className="menu__item" onClick={onClose}>
            <Link className="menu__link" to="/movies">
              Фильмы
            </Link>
          </li>
          <li className="menu__item" onClick={onClose}>
            <Link className="menu__link" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="menu__button-close"
          onClick={onClose}
        />
        <div className="menu__profile" onClick={onClose}>
          <Link className="menu__profile-link" to="/profile">
            Аккаунт
            <img
              src={accountLogo}
              alt="Логотип профиля"
              className="menu__profile-logo"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
