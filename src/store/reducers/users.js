import {
  TEACHER_SUCCESS,
  TEACHERS_SUCCESS,
  USERS_SEND_ERROR,
  USERS_SEND_STARTED,
  USERS_SEND_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: [],
  teacher: [],
  res: null,
  error: null
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_SEND_STARTED:
      return {
        ...state, loading: true,
      }
    case TEACHERS_SUCCESS:
      return {
        ...state, loading: false, data: action.data, error: null,
      }
    case TEACHER_SUCCESS:
      return {
        ...state, loading: false, teacher: action.data, error: null,
      }
    case USERS_SEND_SUCCESS:
      return {
        ...state, loading: false, res: action.res, error: null,
      }
    case USERS_SEND_ERROR:
      return {
        ...state, loading: false, error: action.payload.error,
      }
    default:
      return state
  }
}
