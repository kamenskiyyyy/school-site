import {handleOriginalResponse} from './utils.js';
import {serverUrl} from "./constants";

class NewsApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getAllNews() {
    return fetch(`${this.baseUrl}/news`, {
      headers: this.headers
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data.reverse()
      })
  }

  getNewsItem(url) {
    return fetch(`${this.baseUrl}/news/getNew`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({url})
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data
      })
  }

  createNewNews(data) {
    return fetch(`${this.baseUrl}/news/create`, {
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

  editNewsItem(data) {
    return fetch(`${this.baseUrl}/news/edit`, {
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

  archiveNewsItem(id) {
    return fetch(`${this.baseUrl}/news/archive`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(id)
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data
      })
  }

  deleteNewsItem(id) {
    return fetch(`${this.baseUrl}/news/delete`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(id)
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data
      })
  }
}

export const newsApi = new NewsApi({
  baseUrl: serverUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
