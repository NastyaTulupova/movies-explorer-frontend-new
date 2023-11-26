// Запросы к стороннему API - сервису beatfilm-movies

import { beatfilmCredits } from "./constants";

class MoviesApi {
  constructor(beatfilmCredits) {
    this._baseUrl = beatfilmCredits.baseUrl;
    this._headers = beatfilmCredits.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi(beatfilmCredits);

export {moviesApi};