import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function MoviesCardList({ cards, buttonMore }) {
  const [isLoading, setLoading] = React.useState(false);

  const handlePreloader = () => {
    setLoading(true);
  };

  const path = useLocation();

  return (
    <section className="cards" aria-label="Галерея карточек с фильмами">
      <ul className="cards__gallery">
        {cards.map((card) => (
          <MoviesCard key={card.id} card={card} />
        ))}
      </ul>

      <div
        className={
          path.pathname === "/saved-movies"
            ? "cards__more-container cards__more-container_devinder"
            : "cards__more-container"
        }
      >
        {isLoading ? (
          <Preloader />
        ) : (
          buttonMore && (
            <button
              className="cards__button"
              type="button"
              onClick={handlePreloader}
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
