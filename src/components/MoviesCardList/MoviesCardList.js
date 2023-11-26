import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function MoviesCardList({ cards, preloader, onSave, onDelete, savedMovies }) {
  const [moviesToRender, setMoviesToRender] = React.useState(0);
  const [countMoviesToAdd, setCountMoviesToAdd] = React.useState(0);
  const [buttonMoreActive, setButtonMoreActive] = React.useState(false);

  const path = useLocation();

  function handleShowMoreButtonClick() {
setMoviesToRender(cards.slice(0, moviesToRender.length + countMoviesToAdd));
if (moviesToRender.length >= cards.length - countMoviesToAdd) {
  setButtonMoreActive(false);
}
  }

  return (
    <section className="cards" aria-label="Галерея карточек с фильмами">
      <ul className="cards__gallery">
        {cards.map((card) => (
          <MoviesCard 
          key={card.id} 
          card={card} 
          onSave={onSave}
          onDelete={onDelete}
          savedMovies={savedMovies}
          />
        ))}
      </ul>

      <div
        className={
          path.pathname === "/saved-movies"
            ? "cards__more-container cards__more-container_devinder"
            : "cards__more-container"
        }
      >
        {preloader ? (
          <Preloader />
        ) : (
          buttonMoreActive && (
            <button
              className="cards__button"
              type="button"
              onClick={handleShowMoreButtonClick}
            >
              Ещё
            </button>
          )
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
