import handleOriginalResponse from "./utils";

class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  register = (name, login, email, password) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, login, email, password})
    })
      .then(handleOriginalResponse)
      .then(data => {
        if (data) {
          return data;
        }
      })
  }

  authorize = (login, password) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({login, password})
    })
      .then(handleOriginalResponse)
      .then(data => {
        if (data) {
          return data;
        }
      })
  }

  getContent = () => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data;
      })
  }
}

export const auth = new Auth({
  baseUrl: 'http://localhost:3030',
})
