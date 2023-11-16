import React from "react";

function Portfolio() {
  return (
    <section className="portfolio" aria-label="Секция портфолио">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__container">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/NastyaTulupova/how-to-learn/blob/main/index.html"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <p className="portfolio__pointer">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://nastyatulupova.github.io/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <p className="portfolio__pointer">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://nastyatulupova.github.io/mesto-react-auth"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <p className="portfolio__pointer">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
