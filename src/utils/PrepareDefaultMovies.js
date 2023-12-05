import {BASE_URL} from "../utils/constants";

export default function prepareMoviesHandle(movie) {
    return(
      movie.map((movie) => ({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${BASE_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail:  `${BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        key: movie.id
      }))
    )
  }