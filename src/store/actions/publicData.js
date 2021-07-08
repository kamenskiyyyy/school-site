import {PUBLIC_DATA_SUCCESS, PUBLIC_DATA_STARTED, PUBLIC_DATA_ERROR} from "./actionTypes";
import {authApi} from "../../utils/Auth";

export function getPublicData() {
  return async dispatch => {
    dispatch(publicDataStarted())
    await authApi.getAllTeachers()
      .then(data => {
        dispatch(publicDataSuccess(data))
      })
      .catch(err => {
        dispatch(publicDataError(err.message))
      })
  }
}

function publicDataStarted() {
  return {
    type: PUBLIC_DATA_STARTED
  }
}

function publicDataSuccess(publicData) {
  return {
    type: PUBLIC_DATA_SUCCESS,
    publicData
  }
}

function publicDataError(error) {
  return {
    type: PUBLIC_DATA_ERROR,
    payload: {
      error
    }
  }
}
