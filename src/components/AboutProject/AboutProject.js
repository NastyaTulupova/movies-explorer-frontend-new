import React from "react";

function AboutProject() {
  return (
    <section
      className="about-project"
      id="about-project"
      aria-label="О проекте"
    >
      <h1 className="about-project__title">О проекте</h1>
      <ul className="about-project__text-container">
        <ul className="about-project__steps">
          <li className="about-project__header">
            Дипломный проект включал 5 этапов
          </li>
          <li className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </li>
        </ul>
        <ul className="about-project__deadlines">
          <li className="about-project__header">
            На выполнение диплома ушло 5 недель
          </li>
          <li className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </li>
        </ul>
      </ul>
      <ul className="about-project__timing-container">
        <li className="about-project__time-colored">1 неделя</li>
        <li className="about-project__time">4 недели</li>
        <li className="about-project__course">Back-end</li>
        <li className="about-project__course">Front-end</li>
      </ul>
    </section>
  );
}

export default AboutProject;
