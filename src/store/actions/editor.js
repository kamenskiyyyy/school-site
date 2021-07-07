import {EDITOR_SEND_ERROR, EDITOR_SEND_STARTED, EDITOR_SEND_SUCCESS} from "./actionTypes";
import {newsApi} from "../../utils/News";

export function createNewNews(e, title, categories, isPublic, description, guid, author, date) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await newsApi.createNewNews({title, categories, isPublic, description, guid, author, date})
      .then((response) => {
        dispatch(dataEditorSuccess(response))
      })
      .catch((err) => {
        dispatch(dataEditorError(err.message))
      })
  }
}

export function editNewNews(e, id, title, categories, isPublic, description, guid, author, date) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await newsApi.editNewsItem({id, title, categories, isPublic, description, guid, author, date})
      .then((response) => {
        dispatch(dataEditorSuccess(response))
      })
      .catch((err) => {
        dispatch(dataEditorError(err.message))
      })
  }
}

function dataEditorStarted() {
  return {
    type: EDITOR_SEND_STARTED
  }
}

function dataEditorSuccess(res) {
  return {
    type: EDITOR_SEND_SUCCESS,
    res
  }
}

function dataEditorError(error) {
  return {
    type: EDITOR_SEND_ERROR,
    payload: {
      error
    }
  }
}
