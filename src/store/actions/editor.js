import {EDITOR_SEND_ERROR, EDITOR_SEND_STARTED, EDITOR_SEND_SUCCESS} from "./actionTypes";
import {newsApi} from "../../utils/News";
import {pageApi} from "../../utils/Pages";

export function createNewNews(e, title, categories, isPublic, description, cover, guid, author, date, isPreview) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await newsApi.createNewNews({title, categories, isPublic, description, cover, guid, author, date, isPreview})
      .then((response) => {
        dispatch(dataEditorSuccess(response))
      })
      .catch((err) => {
        dispatch(dataEditorError(err.message))
      })
  }
}

export function editNewNews(e, id, title, categories, isPublic, description, cover, guid, author, date, isPreview) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await newsApi.editNewsItem({id, title, categories, isPublic, description, cover, guid, author, date, isPreview})
      .then((response) => {
        dispatch(dataEditorSuccess(response))
      })
      .catch((err) => {
        dispatch(dataEditorError(err.message))
      })
  }
}

export function createNewPage(e, title, description, link, isPublic, idMenu, menu) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await pageApi.createPage({title, description, link, isPublic, idMenu, menu})
      .then((response) => {
        dispatch(dataEditorSuccess(response))
      })
      .catch((err) => {
        dispatch(dataEditorError(err.message))
      })
  }
}

export function editPage(e, id, title, description, link, isPublic) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await pageApi.editPage({id, title, description, link, isPublic})
      .then((response) => {
        dispatch(dataEditorSuccess(response))
      })
      .catch((err) => {
        dispatch(dataEditorError(err.message))
      })
  }
}

export function deletePage(pageId) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await pageApi.deletePage({pageId})
      .then((response) => {
        dispatch(dataEditorSuccess(response))
      })
      .catch((err) => {
        dispatch(dataEditorError(err.message))
      })
  }
}

export function archiveNewsItem(id) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await newsApi.archiveNewsItem({id})
      .then((response) => {
        dispatch(dataEditorSuccess(response))
      })
      .catch((err) => {
        dispatch(dataEditorError(err.message))
      })
  }
}

export function deleteNewsItem(id) {
  return async dispatch => {
    dispatch(dataEditorStarted())
    await newsApi.deleteNewsItem({id})
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
