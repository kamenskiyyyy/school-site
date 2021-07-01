import handleOriginalResponse from './utils.js';

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
        return data
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
  baseUrl: 'http://localhost:3030',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});
