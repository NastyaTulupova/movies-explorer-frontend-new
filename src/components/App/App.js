import React from "react";
import { Route, Routes, } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import Error from "../Error/Error";
import Menu from "../Menu/Menu";

function App() {
  let user = {
    name: "Виталий",
    email: "pochta@yandex.ru",
    password: "12345678",
  };

  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuClick() {
    setIsMenuOpen(true);
  }

  function closeAllPopups() {
    setIsMenuOpen(false);
  }

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                loggedIn={loggedIn}
                headerClassName={"header header__logout"}
                onMenu={handleMenuClick}
              />
              <Main />
              <Footer />
            </>
          }
        />

        <Route
          path="/movies"
          element={
            <>
              <Header
                loggedIn={true}
                headerClassName={"header header__loggedin"}
                onMenu={handleMenuClick}
              />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header
                loggedIn={true}
                headerClassName={"header header__loggedin"}
                onMenu={handleMenuClick}
              />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header
                loggedIn={true}
                headerClassName={"header header__loggedin"}
                onMenu={handleMenuClick}
              />
              <Profile user={user} />
            </>
          }
        />

        <Route path="/signin" element={<Login user={user} />} />

        <Route path="/signup" element={<Register user={user} />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <Menu
        isOpen={isMenuOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
      />
    </div>
  );
}

export default App;
