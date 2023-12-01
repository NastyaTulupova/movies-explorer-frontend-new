import React, { useState, useEffect, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function SavedMovies({ errorServerText, onSave, onDelete, savedMovies }) {
  const [preloader, setPreloader] = useState(false);
  const [responsedMovies, setResponsedMovies] = useState([]);
  const [moviesCheckboxActive, setMoviesCheckboxActive] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [usersRequest, setUsersRequest] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const clearValidationError = useCallback(() => {
    setValidationError("");
  }, [setValidationError]);

  useEffect(() => {
    clearValidationError();
  }, [clearValidationError, navigate]);

  useEffect(() => {
    setResponsedMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    handleGetMovies(usersRequest);
    handleSetShortMovies();
  }, [usersRequest, moviesCheckboxActive]);

  function handleSearch(moviesList, word) {
    return moviesList.filter((movie) => {
      return (
        movie.nameEN.toLowerCase().includes(word.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(word.toLowerCase())
      );
    });
  }

  async function handleGetMovies(usersRequest) {
    setPreloader(true);
    setValidationError("");
    try {
      if (usersRequest.length > 0) {
        const moviesToShow = await handleSearch(responsedMovies, usersRequest);
        if (moviesToShow.length === 0) {
          setValidationError("Ничего не найдено");
        }
        setResponsedMovies(moviesToShow);
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

  function handleFindShortMovies(moviesList) {
    return moviesList.filter((movie) => {
      return movie.duration <= 40;
    });
  }

  function handleSetShortMovies() {
    setShortMovies(handleFindShortMovies(responsedMovies));
  }

  return (
    <main className="saved-movies">
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

      {!preloader && (
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

export default SavedMovies;
