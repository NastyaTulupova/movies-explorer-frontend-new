import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { func } from "prop-types";

function Movies({
  defaultMovies,
  errorServerText,
  onSave,
  onDelete,
  savedMovies,
}) {
  const [moviesCheckboxActive, setMoviesCheckboxActive] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [responsedMovies, setResponsedMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [usersRequest, setUsersRequest] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    handleGetMovies(usersRequest);
    handleSetShortMovies();
  }, [usersRequest, moviesCheckboxActive]);

  useEffect(() => {
    checkRequestHistory();
  }, []);

  function handleSearch(moviesList, word) {
    return moviesList.filter((movie) => {
      console.log(movie.nameEN);
      return (movie.nameEN.toLowerCase().includes(word.toLowerCase()) || movie.nameRU
        .toLowerCase()
        .includes(
          word.toLowerCase()))
    });
  }

  function handleFindShortMovies(moviesList) {
    return moviesList.filter((movie) => {
      return movie.duration <= 40;
    });
  }

  function handleSetShortMovies() {
    setShortMovies(handleFindShortMovies(responsedMovies));
  }

  async function handleGetMovies(usersRequest) {
    setPreloader(true);
    setResponsedMovies([]);
    console.log(defaultMovies);
    try {
        const moviesToShow = await handleSearch(defaultMovies, usersRequest);
        if (moviesToShow.length === 0) {
          setValidationError("Ничего не найдено");
        }
        // если результат !=0, кладем в локалсторедж последний реквест
        // и сетим найденные фильмы
        else {
          setResponsedMovies(moviesToShow);
          console.log(moviesToShow);
            console.log(`responsedMovies: ${responsedMovies}`);
          localStorage.setItem("lastRequest", JSON.stringify(usersRequest));
          localStorage.setItem(
            "lastMoviesForShow",
            JSON.stringify(moviesToShow)
          );
          localStorage.setItem(
            "lastCheckboxActive",
            JSON.stringify(moviesCheckboxActive)
          );
        
      }
      return;
    } catch (err) {
      console.log(`Произошла ошибка ${err}`);
    } finally {
      setPreloader(false);
    }
  }

  function handleCheckboxChange() {
    setMoviesCheckboxActive(!moviesCheckboxActive);
  }

  function checkRequestHistory() {
    const lastMoviesForShow = localStorage.getItem("lastMoviesForShow");
    if (lastMoviesForShow) {
      setResponsedMovies(lastMoviesForShow);
    }
    const lastRequest = localStorage.getItem("lastRequest");
    if (lastRequest) {
      setUsersRequest(lastRequest);
    }
    const lastCheckboxActive = localStorage.getItem("lastCheckboxActive");
    if (lastCheckboxActive) {
      setMoviesCheckboxActive(lastCheckboxActive);
    }
    return;
  }

  return (
    <main className="movies">
      <SearchForm
        handleSearch={setUsersRequest}
        moviesCheckboxActive={moviesCheckboxActive}
        usersRequest={usersRequest}
        handleCheckboxChange={handleCheckboxChange}
      />
      {preloader && <Preloader />}
      <p
        className={` ${
          validationError || errorServerText ? "movies__error-text" : ""
        }`}
      >
        {validationError || errorServerText}
      </p>

      <MoviesCardList
        cards={!moviesCheckboxActive ? responsedMovies : shortMovies}
        preloader={preloader}
        onSave={onSave}
        onDelete={onDelete}
        savedMovies={savedMovies}
      />
    </main>
  );
}

export default Movies;
