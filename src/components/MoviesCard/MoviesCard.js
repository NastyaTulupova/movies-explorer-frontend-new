import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ card, onSave, onDelete, savedMovies }) {
  const [saved, setSaved] = React.useState(false);
  const [textButton, setTextButton] = React.useState("Сохранить");
  const { pathname } = useLocation();
  const isSavedMovies = true;
  const duration = card.duration;
  let likedId;
  let liked = false;

  useEffect(() => {
    if (liked) {
      setTextButton("");
    }
  }, [liked]);

  liked = savedMovies.some((item) => {
    console.log(item.movieId);
    if (item.movieId === card.movieId) {
      likedId = item._id;
      return true;
    }
    return false;
  });

  function handleSavedToggle() {
    setSaved(!saved);
    if (!saved) {
      setTextButton("");
    } else setTextButton("Сохранить");
  }

  function restructDuration(duration) {
    const hours = Math.floor(duration / 60);
    const min = duration % 60;

    if (hours !== 0) {
      return `${hours}ч ${min}м`;
    } else {
      return `${min}м`;
    }
  }

  const newDuration = restructDuration(duration);

  return (
    <li className="movies-card" aria-label="Карточка фильма">
      <div className="movies-card__info-block">
        <p className="movies-card__title">{card.nameRU}</p>
        <p className="movies-card__duration">{newDuration}</p>
      </div>
      <a
        className="movie__trailer-link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={card.image}
          alt={card.nameRU}
          className="movies-card__image"
        />
      </a>
      {pathname === "/movies" ? (
        <button
          type="button"
          className={`movies-card__button movies-card__button${
            saved || liked ? "_saved" : "_save"
          }
          `}
          onClick={() => {
            handleSavedToggle();
            if (!saved && !liked) {
              onSave(card);
            } else if (isSavedMovies || liked) {
              onDelete(card._id ? card._id : likedId);
            }
          }}
        >
          {textButton}
        </button>
      ) : (
        <></>
      )}
      {pathname === "/saved-movies" ? (
        <button
          type="button"
          className="movies-card__button movies-card__button_delete"
          onClick={() => {
            onDelete(card._id ? card._id : likedId);
          }}
        />
      ) : (
        <></>
      )}
    </li>
  );
}

export default MoviesCard;
