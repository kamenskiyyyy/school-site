import {
  NEWS_DATA_ERROR, NEWS_DATA_STARTED, NEWS_DATA_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  news: null,
  error: null
}

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case NEWS_DATA_STARTED:
      return {
        ...state, loading: true,
      }
    case NEWS_DATA_SUCCESS:
      return {
        ...state, loading: false, news: action.data, error: null,
      }
    case NEWS_DATA_ERROR:
      return {
        ...state, loading: false, error: action.payload.error,
      }
    default:
      return state
  }
}
