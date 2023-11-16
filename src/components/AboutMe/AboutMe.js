import React from "react";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__full-container">
        <article className="about-me__text-container">
          <h3 className="about-me__name">Анастасия</h3>
          <p className="about-me__short-text">Фронтенд-разработчица, 29 лет</p>
          <p className="about-me__long-text">
            Я родилась в Татарстане. Сейчас живу в Москве. Окончила РГУ нефти и
            газа по специальностям "Прикладная математика". Начинала свой путь в
            IT с тех-поддержки пользователей. С 2020 года работаю тестировщиком
            в Райффайзен Банке. В 2023 г проходила обучение в Яндекс Практикуме
            по веб-разработке.{" "}
          </p>
          <a
            className="about-me__link"
            href="https://github.com/NastyaTulupova"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </article>
        <img className="about-me__photo" src={photo} alt="Мое фото" />
      </div>
    </section>
  );
}

export default AboutMe;
