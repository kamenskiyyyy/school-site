import {PUBLIC_DATA} from "./actionTypes";
import {authApi} from "../../utils/auth";

export function getPublicData() {
  return async dispatch => {
    await authApi.getAllTeachers()
      .then(data => {
        dispatch(publicDataSuccess(data))
      })
      .catch(err => console.error(err))
  }
}

export function publicDataSuccess(publicData) {
  return {
    type: PUBLIC_DATA,
    publicData
  }
}
