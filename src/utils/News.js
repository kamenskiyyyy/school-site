import handleOriginalResponse from './utils.js';
import {baseUrl, serverUrl} from "./constants";

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

  searchNewsItem(id) {
    return fetch(`${this.baseUrl}/news/search`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({id})
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
