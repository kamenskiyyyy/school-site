import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";
import {statusErrors} from "../../utils/constants";
import {authApi} from "../../utils/auth";

// Обработчик ошибки по кнопке Войти
function handleError(form, statusError) {
  const errors = statusErrors.filter(error => error.name === form.name)[0].errors;
  const statusErrorMessage = errors.filter(error => error.status === statusError)[0].message;
  console.error(statusErrorMessage)
  // setIsLoading(false);
  // setInfoTooltip({
  //   ...infoTooltip,
  //   isOpen: true,
  //   image: statusErrorImage,
  //   message: statusErrorMessage ? statusErrorMessage : statusErrorText
  // });
}

export function auth(e, login, password) {
  return async dispatch => {
    await authApi.authorize(login, password)
      .then(userData => {
        localStorage.setItem('userData', JSON.stringify(userData))
        dispatch(authSuccess(userData))
      })
      .catch(err => handleError(e.target, err));
  }
}

export function autoLogin() {
  const userData = localStorage.getItem('userData')
  return async dispatch => {
    if (userData) {
      dispatch(authSuccess(JSON.parse(userData)))
    } else {
      await authApi.getContent()
        .then((data) => {
          localStorage.setItem('userData', JSON.stringify(data))
          dispatch(authSuccess(data))
        })
    }
  }
}

export function logout() {
  localStorage.clear()
  authApi.logout()
  return dispatch => {
    dispatch({type: AUTH_LOGOUT})
  }
}



function authSuccess(userData) {
  return {
    type: AUTH_SUCCESS,
    userData
  }
}
