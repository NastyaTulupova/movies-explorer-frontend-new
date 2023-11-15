import React from "react";

function NavTab() {
  return (
    <section className="nav-tab" aria-label="Навигация на секцию О проекте">
      <a href="#about-project">
        <button className="nav-tab__button">Узнать больше</button>
      </a>
    </section>
  );
}

export default NavTab;
