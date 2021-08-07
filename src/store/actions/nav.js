import {
  NAV_DATA_SUCCESS,
  NAV_DATA_ERROR
} from "./actionTypes";
import {navApi} from "../../utils/Nav";

export function getNavData() {
  return async dispatch => {
    await navApi.getNav()
      .then(data => {
        dispatch(navDataSuccess(data))
      })
      .catch(err => {
        dispatch(navDataError(err.message))
      })
  }
}

function navDataSuccess(nav) {
  return {
    type: NAV_DATA_SUCCESS,
    nav
  }
}

function navDataError(error) {
  return {
    type: NAV_DATA_ERROR,
    payload: {
      error
    }
  }
}
