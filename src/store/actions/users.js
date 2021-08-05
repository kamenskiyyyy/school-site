import {
  TEACHER_SUCCESS,
  TEACHERS_SUCCESS,
  USERS_SEND_ERROR,
  USERS_SEND_STARTED,
  USERS_SEND_SUCCESS
} from "./actionTypes";
import {usersApi} from "../../utils/Users";

export function getAllTeachers() {
  return async dispatch => {
    dispatch(userSendStarted())
    await usersApi.getAllTeachers()
      .then(data => {
        dispatch(teachersSuccess(data))
      })
      .catch(err => {
        dispatch(userSendError(err.message))
      })
  }
}

export function getTeacher(id) {
  return async dispatch => {
    dispatch(userSendStarted())
    await usersApi.getTeacher(id)
      .then(data => {
        dispatch(teacherSuccess(data))
      })
      .catch(err => {
        dispatch(userSendError(err.message))
      })
  }
}

export function createNewUsers(name, position, subjects, category, email, login, password, role, work, avatar) {
  return async dispatch => {
    dispatch(userSendStarted())
    await usersApi.createUser({name, position, subjects, category, email, login, password, role, work, avatar})
      .then((response) => {
        dispatch(userSendSuccess(response))
      })
      .catch((err) => {
        dispatch(userSendError(err.message))
      })
  }
}

function userSendStarted() {
  return {
    type: USERS_SEND_STARTED
  }
}

function teachersSuccess(data) {
  return {
    type: TEACHERS_SUCCESS,
    data
  }
}

function teacherSuccess(data) {
  return {
    type: TEACHER_SUCCESS,
    data
  }
}

function userSendSuccess(res) {
  return {
    type: USERS_SEND_SUCCESS,
    res
  }
}

function userSendError(error) {
  return {
    type: USERS_SEND_ERROR,
    payload: {
      error
    }
  }
}
