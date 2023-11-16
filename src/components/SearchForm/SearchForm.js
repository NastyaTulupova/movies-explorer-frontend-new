import React from "react";

function SearchForm() {
  return (
    <section className="search-form" aria-label="Форма поиска">
      <form className="search-form__form" noValidate>
        <div className="search-form__input-container">
          <input
            type="text"
            className="search-form__input"
            name="filmtitle"
            placeholder="Фильм"
            required
          />
          <button className="search-form__button" type="submit">
            Поиск
          </button>
        </div>
        <div className="search-form__toggle-with-text">
          <label className="search-form__toggle-container">
            <input type="checkbox" className="search-form__checkbox" />
            <span className="search-form__slider" />
          </label>
          <p className="search-form__toggle-title">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
