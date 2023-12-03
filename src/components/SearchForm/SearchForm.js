import React from "react";
import { useEffect } from "react";
import useValidation from "../../hooks/useValidation";

function SearchForm({
  handleSearch,
  moviesCheckboxActive,
  usersRequest,
  handleCheckboxChange,
}) {
  const { values, errors, handleChange, reset, isValid } = useValidation();
  const { title } = values;

  useEffect(() => {
    reset({ title: usersRequest });
  }, [usersRequest]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(title);
  }

  function newHandleChekboxChange (evt){
    handleSearch(title);
    evt.preventDefault();
    handleCheckboxChange(evt)
    

  }

  return (
    <section className="search-form" aria-label="Форма поиска">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__input-container">
          <input
            type="text"
            className="search-form__input"
            name="title"
            placeholder="Фильм"
            value={values.title || ""}
            onChange={handleChange}
            required
          />
          <button
            className={`search-form__button ${
              !isValid ? "search-form__button_disabled" : ""
            }`}
            type="submit"
            disabled={!isValid}
          >
            Поиск
          </button>
        </div>
        <p
          className={`form__error-text ${
            errors.title ? "form__error-text_visible " : ""
          }`}
        >
          {errors.title}
        </p>
        <div className="search-form__toggle-with-text">
          <label className="search-form__toggle-container">
            <input
              type="checkbox"
              className="search-form__checkbox"
              value={moviesCheckboxActive}
              checked={ moviesCheckboxActive}
              onChange={ newHandleChekboxChange}
            />
            <span className="search-form__slider" />
          </label>
          <p className="search-form__toggle-title">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
