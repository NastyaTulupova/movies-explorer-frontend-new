import React from "react";

import promoImage from "../../images/promoImage.svg";

function Promo() {
  return (
    <section className="promo">
      <article className="promo__container">
        <h2 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h2>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
      </article>
      <img
        src={promoImage}
        alt="Изображение глобуса с помощью слов WEB"
        className="promo__image"
      />
    </section>
  );
}

export default Promo;
