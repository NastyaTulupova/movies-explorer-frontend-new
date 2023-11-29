import React from "react";
import { useLocation, useCallback } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import useWindowSize from "../../hooks/useWindowSize";



function MoviesCardList({ cards, preloader, onSave, onDelete, savedMovies, onClick }) {

  const [countMoviesToAdd, setCountMoviesToAdd] = React.useState(0);
  const [countMoviesToRender, setCountMoviesToRender] = React.useState(0);
  const [buttonMoreActive, setButtonMoreActive] = React.useState(false);
  const [moviesToRender, setMoviesToRender] = React.useState([]);

  const path = useLocation();

const SIZE_LARGE = 1005;
const SIZE_MEDIUM = 768;
const SIZE_SMALL = 320;

const COUNT_MOVIES_TO_RENDER_LARGE = 12;
const  COUNT_MOVIES_TO_RENDER_MEDIUM = 8;
const  COUNT_MOVIES_TO_RENDER_SMALL = 5;

const COUNT_MOVIES_TO_ADD_LARGE = 3
const COUNT_MOVIES_TO_ADD_MEDIUM = 2;

const widthWindow = useWindowSize();

React.useEffect(() => {
  calcCountMoviesToRender();
  console.log(widthWindow);
}, [widthWindow])

const calcCountMoviesToRender = () => {
  if (widthWindow < SIZE_MEDIUM && widthWindow >= SIZE_SMALL) {
  setCountMoviesToRender(COUNT_MOVIES_TO_RENDER_SMALL);
  setCountMoviesToAdd( COUNT_MOVIES_TO_ADD_MEDIUM);
  }
  if (widthWindow < SIZE_LARGE && widthWindow >= SIZE_MEDIUM) {
    setCountMoviesToRender(COUNT_MOVIES_TO_RENDER_MEDIUM);
    setCountMoviesToAdd( COUNT_MOVIES_TO_ADD_MEDIUM);
  }
  if (widthWindow >= SIZE_LARGE) {
    setCountMoviesToRender(COUNT_MOVIES_TO_RENDER_LARGE);
    setCountMoviesToAdd(COUNT_MOVIES_TO_ADD_LARGE);
} }

const handleShowMoreButtonClick = () => {
setMoviesToRender(cards.slice(0, moviesToRender.length + countMoviesToAdd));
if (moviesToRender.length >= cards.length - countMoviesToAdd) {
  setButtonMoreActive(false);
}
}

React.useEffect(() => {
  if (path.pathname === "/movies") {
    setMoviesToRender(cards.slice(0, countMoviesToRender));
    if (cards.length > countMoviesToRender) {
      setButtonMoreActive(true);
    } else {
      setButtonMoreActive(false);
    }
  } else if (path.pathname === "/saved-movies") {
    setMoviesToRender(cards);
    setButtonMoreActive(false);
  }
  console.log(widthWindow, countMoviesToAdd);
}, [cards, countMoviesToRender])


  return (
    <section className="cards" aria-label="Галерея карточек с фильмами">
      <ul className="cards__gallery">
      {preloader ? <Preloader /> :
        moviesToRender.map((card) => (
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
          {buttonMoreActive && (
            <button
              className="cards__button"
              type="button"
              onClick={handleShowMoreButtonClick}
            >
              Ещё
            </button>
          )}
      </div>
    </section>
  );
}

export default MoviesCardList;
