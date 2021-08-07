import {
  NEWS_DATA_STARTED, NEWS_DATA_SUCCESS, NEWS_DATA_ERROR
} from "./actionTypes";
import {newsApi} from "../../utils/News";

export function getAllNews() {
  return async dispatch => {
    dispatch(newsDataStarted())
    await newsApi.getAllNews()
      .then(data => {
        dispatch(newsDataSuccess(data))
      })
      .catch(err => {
        dispatch(newsDataError(err.message))
      })
  }
}

function newsDataStarted() {
  return {
    type: NEWS_DATA_STARTED
  }
}

function newsDataSuccess(data) {
  return {
    type: NEWS_DATA_SUCCESS,
    data
  }
}

function newsDataError(error) {
  return {
    type: NEWS_DATA_ERROR,
    payload: {
      error
    }
  }
}
