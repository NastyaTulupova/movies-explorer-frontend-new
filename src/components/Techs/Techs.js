import React from "react";

function Techs() {
  return (
    <section className="techs" aria-label="Технологический стек курса">
      <h2 className="techs__title">Технологии</h2>
      <article className="techs__container">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили
          в&nbsp;дипломном&nbsp;проекте.
        </p>
      </article>
      <section className="techs__container-stack">
        <p className="techs__item">HTML</p>
        <p className="techs__item">CSS</p>
        <p className="techs__item">JS</p>
        <p className="techs__item">React</p>
        <p className="techs__item">Git</p>
        <p className="techs__item">Express.js</p>
        <p className="techs__item">mongoDB</p>
      </section>
    </section>
  );
}

export default Techs;
