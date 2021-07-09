import {handleOriginalResponse} from "./utils";
import {serverUrl} from "./constants";

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

  logout = () => {
    return fetch(`${this.baseUrl}/users/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(handleOriginalResponse)
  }

  getAllTeachers = () => {
    return fetch(`${this.baseUrl}/teachers`, {
      method: 'GET',
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

export const authApi = new Auth({
  baseUrl: serverUrl,
})
