import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <main className="error" aria-label="Страница не найдена. 404 ошибка">
      <h1 className="error__title">404</h1>
      <h2 className="error__subtitle">Страница не найдена</h2>
      <Link className="error__back" onClick={handleClick}>
        Назад
      </Link>
    </main>
  );
}

export default Error;
