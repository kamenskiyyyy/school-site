import {
  EDITOR_SEND_ERROR,
  EDITOR_SEND_STARTED,
  EDITOR_SEND_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  res: null,
  error: null
}

export default function editorReducer(state = initialState, action) {
  switch (action.type) {
    case EDITOR_SEND_STARTED:
      return {
        ...state, loading: true,
      }
    case EDITOR_SEND_SUCCESS:
      return {
        ...state, loading: false, res: action.res, error: null,
      }
    case EDITOR_SEND_ERROR:
      return {
        ...state, loading: false, error: action.payload.error,
      }
    default:
      return state
  }
}
