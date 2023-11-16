import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import savedCards from "../../utils/SavedMovies";

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={savedCards} buttonMore={false} />
    </main>
  );
}

export default SavedMovies;
