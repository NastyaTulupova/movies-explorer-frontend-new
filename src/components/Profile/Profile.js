import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidation from "../../hooks/useValidation";
import "../Form/Form.css";

function Profile({ signOut, onUpdateUser, errorMessage }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, handleChange, isValid, reset } = useValidation();
  const { email, name } = values;
  const [isActiveButton, setIsActiveButton] = React.useState(false);

  React.useEffect(
    () => reset({ name: currentUser.name, email: currentUser.email }),
    [currentUser]
  );

  React.useEffect(() => {
    let isSameValue =
      currentUser.name !== values.name || currentUser.email !== values.email;
    setIsActiveButton(isSameValue);
  }, [currentUser, values, isValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, email });
  }

  return (
    <section className="profile" aria-label="Профиль пользователя">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <div className="profile__input-with-error">
          <div className="profile__input-area profile__input-area_name">
            <p className="profile__text">Имя</p>
            <input
              type="text"
              className={`profile__input ${
                errors.name ? "profile__input_color" : ""
              }`}
              value={values.name || ""}
              name="name"
              minLength="2"
              maxLength="30"
              pattern="^(?!\s)[A-Za-zА-Яа-я\-\s]+$"
              onChange={handleChange}
            />
          </div>
          <p
            className={`form__error-text ${
              errors.name ? "form__error-text_visible " : ""
            }`}
          >
            {errors.name}
          </p>
        </div>

        <div className="profile__input-with-error">
          <div className="profile__input-area">
            <p className="profile__text">E-mail</p>
            <input
              type="email"
              className={`profile__input ${
                errors.email ? "profile__input_color" : ""
              }`}
              value={values.email || ""}
              name="email"
              pattern="^.+@.+\..+$"
              onChange={handleChange}
            />
          </div>
          <p
            className={`form__error-text ${
              errors.email ? "form__error-text_visible " : ""
            }`}
          >
            {errors.email}
          </p>
        </div>
        <div className="form__button-area">
          <p className="form__error-server">{errorMessage || ""}</p>
          <button
            className={`profile__button  ${
              !isValid || !isActiveButton
                ? "profile__button_disabled"
                : "profile__button_colored"
            }`}
            type="submit"
            disabled={!isValid || !isActiveButton}
            onSubmit={handleSubmit}
          >
            Редактировать
          </button>
        </div>
      </form>

      <Link to="/" className="profile__link" onClick={signOut}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
