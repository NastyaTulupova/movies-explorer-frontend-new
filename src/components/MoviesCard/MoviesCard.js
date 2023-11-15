import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {
  const [saved, setSaved] = React.useState(false);
  const [textButton, setTextButton] = React.useState("Сохранить");
  const { pathname } = useLocation();

  function handleSavedToggle() {
    setSaved(!saved);
    setTextButton("");
  }

  return (
    <li className="movies-card" aria-label="Карточка фильма">
      <div className="movies-card__info-block">
        <p className="movies-card__title">{card.title}</p>
        <p className="movies-card__duration">{card.duration}</p>
      </div>
      <img src={card.image} alt={card.title} className="movies-card__image" />
      {pathname === "/movies" ? (
        <button
          type="button"
          className={`movies-card__button movies-card__button${
            saved ? "_saved" : "_save"
          }`}
          onClick={handleSavedToggle}
        >
          {textButton}
        </button>
      ) : (
        <button
          type="button"
          className="movies-card__button movies-card__button_delete"
        />
      )}
    </li>
  );
}

export default MoviesCard;
