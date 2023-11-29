import React, { useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import MainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { moviesApi } from "../../utils/MoviesApi";
import prepareMoviesHandle from "../../utils/PrepareDefaultMovies";
import mainApi from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [tooltipTitle, setTooltipTitle] = React.useState("");
  const [tooltipIcon, setTooltipIcon] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [errorServerText, setErrorServerText] = React.useState("");
  const [preloader, setPreloader] = React.useState(false);
  const [defaultMovies, setDefaultMovies] = React.useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
  //  setPreloader(true);
    if(loggedIn) {
      Promise.all([MainApi.getData(), MainApi.getMovies()])
        .then(([resUser, resUsersSavedMovies]) => {
          setCurrentUser(resUser);
          setSavedMovies(resUsersSavedMovies);
        })
        .catch((error) => console.log(`Произошла ошибка ${error}`))
       // .finally(() =>{
        //  setPreloader(false);}
       // );
    }}, [loggedIn]);

  React.useEffect(() => {
    handleDefaultMoviesCheck();
  }, []);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage("");
  }, [setErrorMessage]);

  React.useEffect(() => {
    clearErrorMessage();
  }, [clearErrorMessage, navigate]);

  function handleMenuClick() {
    setIsMenuOpen(true);
  }

  function closeAllPopups() {
    setIsMenuOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleUpdateUser({ name, email }) {
    setPreloader(true);

    MainApi.updateUserData({ name, email })
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
        setIsInfoTooltipPopupOpen(true);
        setTooltipTitle("Данные обновлены!");
        setTooltipIcon("success");
      })
      .catch((err) => {
        if (err === 409) {
          setErrorMessage("Пользователь с указанным email уже существует");
        } else
          setErrorMessage("На сервере произошла ошибка. Повторите попытку");
        console.log(`Произошла ошибка ${err}`);
      }).finally(() => {setPreloader(false)
      }
      );
  }

  function handleRegister(data) {
    setPreloader(true);

    MainApi.register(data)
      .then(() => {
        setIsInfoTooltipPopupOpen(true);
        setTooltipTitle("Вы успешно зарегистрировались!");
        setTooltipIcon("success");
        handleLogin(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
        if (err === 409) {
          setErrorMessage("Пользователь с указанным email уже существует");
        } else
          setErrorMessage("На сервере произошла ошибка. Повторите попытку");
      })
      .finally(() => {setPreloader(false)
      }
      );
  }

  function handleLogin(data) {
    setPreloader(true);
    MainApi.authorize(data)
      .then((data) => {
        localStorage.setItem("loggedIn", true);
        setLoggedIn(true);
        setCurrentUser({
          email: data.email,
          name: data.name,
        });
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
        if (err === 400) {
          setErrorMessage("Вы ввели неправильный логин или пароль");
        } else
          setErrorMessage("На сервере произошла ошибка. Повторите попытку");
      }).finally(() => {setPreloader(false)
      }
      );
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem("loggedIn")) {
      MainApi.getData()
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser({
            _id: data._id,
            email: data.email,
            name: data.name,
          });
         // navigate(location);
        })
        .catch((error) => console.log(`Произошла ошибка ${error}`));
    }
  };

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("defaultMovies");
    localStorage.removeItem("moviesCheckboxActive");
    localStorage.removeItem("usersRequest");
   // localStorage.removeItem();
    setCurrentUser({});
    navigate("/");
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  // ФИЛЬМЫ:

  function handleGetDefaultMovies() {
    setPreloader(true);
    moviesApi
      .getMovies()
      .then((res) => {
        const preparedMovies = prepareMoviesHandle(res);
        localStorage.setItem("defaultMovies", JSON.stringify(preparedMovies));
        setDefaultMovies(preparedMovies);
        console.log(`def mov: ${defaultMovies}`);
        console.log(`local stor: ${localStorage.getItem("defaultMovies")}`);
      })
      .catch((err) => {
        setErrorServerText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        console.log(`Произошла ошибка ${err}`);
        setDefaultMovies([]);
        localStorage.removeItem("defaultMovies");
      }).finally(() => {setPreloader(false)
      }
      );
  }

  function handleDefaultMoviesCheck() {
    if (localStorage.getItem("defaultMovies")) {
      setDefaultMovies(JSON.parse(localStorage.getItem("defaultMovies")));
    } else {
      handleGetDefaultMovies();
    }
  }

  function handleSaveMovie(movie) {
   // setPreloader(true);
    mainApi
      .addMovies(movie)
      .then((item) => {
        setSavedMovies([item, ...savedMovies]);
        console.log(savedMovies);
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
      //.finally(() => {setPreloader(false)
     // }
      //);
  }

  function handleDeleteMovie(_id) {
   // setPreloader(true);
    mainApi
      .deleteMovies(_id)
      .then(() => {
        const newSavedMovies = savedMovies.filter((movie) => movie._id !== _id);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
      //.finally(() => {setPreloader(false)
      //}
      //);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            exact path="/"
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
                <ProtectedRoute
                  component={Header}
                  loggedIn={loggedIn}
                  headerClassName={"header header__loggedin"}
                  onMenu={handleMenuClick}
                />
                <ProtectedRoute
                  component={Movies}
                  loggedIn={loggedIn}
                  defaultMovies={defaultMovies}
                  errorServerText={errorServerText}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  preloader={preloader}
                />
                <ProtectedRoute loggedIn={loggedIn} component={Footer} />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <ProtectedRoute
                  component={Header}
                  loggedIn={loggedIn}
                  headerClassName={"header header__loggedin"}
                  onMenu={handleMenuClick}
                />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={SavedMovies}
                  defaultMovies={defaultMovies}
                  errorServerText={errorServerText}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  preloader={preloader}
                />
                <ProtectedRoute loggedIn={loggedIn} component={Footer} />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Header}
                  headerClassName={"header header__loggedin"}
                  onMenu={handleMenuClick}
                />
                <ProtectedRoute
                  component={Profile}
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  signOut={signOut}
                  errorMessage={errorMessage}
                  preloader={preloader}
                />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                loggedIn={loggedIn}
                errorMessage={errorMessage}
                preloader={preloader}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                errorMessage={errorMessage}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>

        <Menu
          isOpen={isMenuOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          title={tooltipTitle}
          icon={tooltipIcon}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
