import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_STARTED,
  AUTH_SUCCESS,
  PUBLIC_DATA_ERROR,
  PUBLIC_DATA_STARTED
} from "./actionTypes";
import {authApi} from "../../utils/Auth";

export function auth(e, login, password) {
  return async dispatch => {
    dispatch(authStarted())
    await authApi.authorize(login, password)
      .then(userData => {
        localStorage.setItem('userData', JSON.stringify(userData))
        dispatch(authSuccess(userData))
      })
      .catch(err => {
        dispatch(authError(err.message))
      })
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

function authStarted() {
  return {
    type: AUTH_STARTED
  }
}

export function logout() {
  authApi.logout()
  localStorage.clear()
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

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: {
      error
    }
  }
}
