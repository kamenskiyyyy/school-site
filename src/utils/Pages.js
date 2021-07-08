import {handleOriginalResponse} from './utils.js';
import {serverUrl} from "./constants";

class PageApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getPage(url) {
    return fetch(`${this.baseUrl}/page`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({url})
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data
      })
  }

  createPage(data) {
    return fetch(`${this.baseUrl}/pages/create`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data
      })
  }

  editPage(data) {
    return fetch(`${this.baseUrl}/pages/edit`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data
      })
  }

  deletePage(data) {
    return fetch(`${this.baseUrl}/pages/delete`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data
      })
  }
}

export const pageApi = new PageApi({
  baseUrl: serverUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
