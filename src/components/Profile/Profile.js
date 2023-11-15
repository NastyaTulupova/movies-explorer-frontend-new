import React from "react";

function Profile({ user }) {
  return (
    <section className="profile" aria-label="Профиль пользователя">
      <h2 className="profile__title">Привет, {user.name}!</h2>
      <form className="profile__form">
        <div className="profile__input-area">
          <p className="profile__text">Имя</p>
          <input type="text" className="profile__input" value={user.name} />
        </div>
        <div className="profile__input-area">
          <p className="profile__text">E-mail</p>
          <input type="email" className="profile__input" value={user.email} />
        </div>
      </form>
      <button className="profile__button">Редактировать</button>
      <a href="/" className="profile__link">
        Выйти из аккаунта
      </a>
    </section>
  );
}

export default Profile;
