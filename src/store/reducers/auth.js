import {AUTH_ERROR, AUTH_LOGOUT, AUTH_STARTED, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
  loading: false,
  isLogin: false,
  userData: [],
  error: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_STARTED:
      return {
        ...state, loading: true,
      }
    case AUTH_SUCCESS:
      return {
        ...state, loading: false, isLogin: true, userData: action.userData,
      }
    case AUTH_ERROR:
      return {
        ...state, loading: false, isLogin: false, error: action.payload.error,
      }
    case AUTH_LOGOUT:
      return {
        ...state, isLogin: false, userData: false
      }
    default:
      return state
  }
}
