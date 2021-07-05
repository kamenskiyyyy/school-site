import {PUBLIC_DATA} from "../actions/actionTypes";

const initialState = {
  publicData: undefined
}

export default function publicDataReducer(state = initialState, action) {
  switch (action.type) {
    case PUBLIC_DATA:
      return {
        ...state, publicData: action.publicData,
      }
    default:
      return state
  }
}
