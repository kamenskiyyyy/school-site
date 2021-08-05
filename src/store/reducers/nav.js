import {
  NAV_DATA_ERROR,
  NAV_DATA_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  nav: [],
  error: null
}

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case NAV_DATA_SUCCESS:
      return {
        ...state, nav: action.nav, error: null,
      }
    case NAV_DATA_ERROR:
      return {
        ...state, error: action.payload.error,
      }
    default:
      return state
  }
}
