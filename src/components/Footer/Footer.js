import React from "react";

function Footer() {
  return (
    <section className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__copyright">&#169; 2023</p>
        <ul className="footer__links">
          <li className="footer__link">
            <a
              className="footer__link-text"
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link">
            <a
              className="footer__link-text"
              href="https://github.com/NastyaTulupova"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
