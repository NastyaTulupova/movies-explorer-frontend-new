import React from "react";

import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import logoSite from "../../images/logoSite.svg";

function Header({ loggedIn, onMenu, headerClassName }) {
  return (
    <header className={headerClassName}>
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={logoSite} alt="Лого сайта" />
      </Link>
      {loggedIn ? (
        <div className="header__navigation">
          <Navigation onMenu={onMenu} />
        </div>
      ) : (
        <div className="header__container">
          <>
            <Link className="header__link" to="/signup">
              Регистрация
            </Link>
            <Link className="header__button" to="/signin">
              Войти
            </Link>
          </>
        </div>
      )}
    </header>
  );
}

export default Header;
