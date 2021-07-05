import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
  userData: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, userData: action.userData,
      }
    case AUTH_LOGOUT:
      return {
        ...state, userData: false
      }
    default:
      return state
  }
}
