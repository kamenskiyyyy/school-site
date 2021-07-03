import './App.css';
import {Switch, Route} from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import News from "../News/News";
import PageNewsItem from "../PageNewsItem/PageNewsItem";
import TextEditorPage from "../PageTextEditor/PageTextEditor";
import {AppContext} from "../../contexts/AppContext";
import {useState} from "react";
import Login from "../Login/Login";
import {auth} from "../../utils/auth";
import {statusErrors} from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  // Обработчик ошибки по кнопке Войти
  function handleError(form, statusError) {
    const errors = statusErrors.filter(error => error.name === form.name)[0].errors;
    const statusErrorMessage = errors.filter(error => error.status === statusError)[0].message;
    setIsLoading(false);
    // setInfoTooltip({
    //   ...infoTooltip,
    //   isOpen: true,
    //   image: statusErrorImage,
    //   message: statusErrorMessage ? statusErrorMessage : statusErrorText
    // });
  }

  // Обработчик по кнопке Войти
  function handleLogin(e, login, password) {
    // loadingPopup(true)
    auth.authorize(login, password)
      .then((data) => {
        setIsLoading(false)
        // setInfoTooltip({isOpen: false})
        setLoggedIn(true);
        // setCurrentUser({...data});
        window.location.reload();
      })
      .catch(err => handleError(e.target, err));                                          // По указанным Логину и Паролю пользователь не найден. Проверьте введенные данные и повторите попытку.
  }


  return (
    <AppContext.Provider value={{loggedIn}}>
      <Header isLogin={loggedIn}/>
      <Switch>
        <Route exact path='/editor'>
          <TextEditorPage/>
        </Route>
        <Route exact path='/news/:id'>
          <PageNewsItem/>
        </Route>
        <Route path='/news'>
          <News/>
        </Route>
        <Route path='/signin'>
          <Login handleLogin={handleLogin}
                 handleError={handleError} />
        </Route>
        <Route path='/'>
          <Main/>
        </Route>
      </Switch>
      <Footer/>
    </AppContext.Provider>
  );
}

export default App;
