import {PUBLIC_DATA_ERROR, PUBLIC_DATA_STARTED, PUBLIC_DATA_SUCCESS} from "../actions/actionTypes";

const initialState = {
  loading: false,
  publicData: [],
  error: null
}

export default function teachersReducer(state = initialState, action) {
  switch (action.type) {
    case PUBLIC_DATA_STARTED:
      return {
        ...state, loading: true,
      }
    case PUBLIC_DATA_SUCCESS:
      return {
        ...state, loading: false, publicData: action.publicData, error: null,
      }
    case PUBLIC_DATA_ERROR:
      return {
        ...state, loading: false, error: action.payload.error,
      }
    default:
      return state
  }
}
