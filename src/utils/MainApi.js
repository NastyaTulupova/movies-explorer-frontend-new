// Запросы к собственному API

//export const BASE_URL = "https://api.movies.tulupova.nomoredomainsrocks.ru";
//export const BASE_URL = "http://localhost:3000";

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

_checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

register = ({name, email, password}) => {
  return fetch(`${this._baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: name,
      password: password,
      email: email,
    }),
  }).then((res) => this._checkResponse(res));
};

authorize = ({email, password}) => {
  return fetch(`${this._baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => this._checkResponse(res));
};

getData = () => {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => this._checkResponse(res));
};

updateUserData = ({name, email}) => {
  return fetch(
    `${this._baseUrl}/users/me`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) =>this._checkResponse(res));
};

getMovies = () => {
  return fetch(`${this._baseUrl}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => this._checkResponse(res));
};

 addMovies = (data) => {
  return fetch(`${this._baseUrl}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image,
      trailerLink: data.trailerLink,
      thumbnail: data.thumbnail,
      movieId: data.movieId,
      nameRU: data.nameRU,
      nameEN: data.nameEN
    })
  }).then((res) => this._checkResponse(res));
};

deleteMovies = (movieId) => {
  return fetch(`${this._baseUrl}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => this._checkResponse(res));
};
}

const mainApi = new MainApi(
  {
   // baseUrl: "https://api.mesto.tulupova.nomoredomainsrocks.ru",
    baseUrl: "http://localhost:3000",
  });

export default mainApi;

