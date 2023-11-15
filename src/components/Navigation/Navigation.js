import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoAccount from "../../images/logoAccount.svg";

function Navigation({ onMenu }) {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="navigation__links">
        <>
          <Link className="navigation__link" to="/movies">
            Фильмы
          </Link>
          <Link className="navigation__link" to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </>
      </div>
      <div className="navigation__account-container">
        <Link className="navigation__account" to="/profile">
          Аккаунт
          <img
            src={logoAccount}
            alt="Лого аккаунта"
            className={
              location.pathname === "/"
                ? "navigation__account-logo navigation__account-logo-project"
                : "navigation__account-logo"
            }
          />
        </Link>
      </div>
      <button className="navigation__account-burger" onClick={onMenu} />
    </nav>
  );
}

export default Navigation;
