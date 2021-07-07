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

  searchNewsItem(url) {
    return fetch(`${this.baseUrl}/news/getNews`, {
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
}

export const newsApi = new NewsApi({
  baseUrl: serverUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
