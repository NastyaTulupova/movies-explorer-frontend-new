import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
  defaultMovies,
  errorServerText,
  onSave,
  savedMovies,
  onDelete,
}) {
  const [moviesCheckboxActive, setMoviesCheckboxActive] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [responsedMovies, setResponsedMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [usersRequest, setUsersRequest] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleGetMovies(usersRequest);
    handleSetShortMovies();
  }, [usersRequest, moviesCheckboxActive]);

  useEffect(() => {
    checkRequestHistory();
  }, []);

  const clearValidationError = useCallback(() => {
    setValidationError("");
  }, [setValidationError]);

  useEffect(() => {
    clearValidationError();
  }, [clearValidationError, navigate]);

  function handleSearch(moviesList, word) {
    return moviesList.filter((movie) => {
      return (
        movie.nameEN.toLowerCase().includes(word.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(word.toLowerCase())
      );
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
    setValidationError("");
    try {
      const moviesToShow = await handleSearch(defaultMovies, usersRequest);
      if (moviesToShow.length === 0) {
        setValidationError("Ничего не найдено");
      }
      // если результат !=0, кладем в локалсторедж последний реквест
      // и сетим найденные фильмы
      else {
        setResponsedMovies(moviesToShow);
        localStorage.setItem("lastRequest", usersRequest);
        localStorage.setItem("lastMoviesForShow", JSON.stringify(moviesToShow));
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
      setResponsedMovies(JSON.parse(lastMoviesForShow));
    }
    const lastRequest = localStorage.getItem("lastRequest");
    if (lastRequest) {
      setUsersRequest(lastRequest);
    }
    const lastCheckboxActive = localStorage.getItem("lastCheckboxActive");
    if (lastCheckboxActive) {
      setMoviesCheckboxActive(JSON.parse(lastCheckboxActive));
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
      {(validationError || errorServerText) && (
        <p
          className={` ${
            validationError || errorServerText ? "movies__error-text" : ""
          }`}
        >
          {validationError || errorServerText}
        </p>
      )}
      {!preloader && !validationError && !errorServerText && (
        <MoviesCardList
          cards={!moviesCheckboxActive ? responsedMovies : shortMovies}
          preloader={preloader}
          onSave={onSave}
          onDelete={onDelete}
          savedMovies={savedMovies}
        />
      )}
    </main>
  );
}

export default Movies;
