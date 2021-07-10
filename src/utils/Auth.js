import {handleOriginalResponse} from "./utils";
import {serverUrl} from "./constants";

class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
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
}

export const authApi = new Auth({
  baseUrl: serverUrl,
})
