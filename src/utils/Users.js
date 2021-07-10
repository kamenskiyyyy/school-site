import {handleOriginalResponse} from "./utils";
import {serverUrl} from "./constants";

class Users {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  uploadUserAvatar = (data) => {
    return fetch(`${this.baseUrl}/create-user/upload-avatar`, {
      method: 'POST',
      credentials: 'include',
      body: data
    })
      .then(handleOriginalResponse)
      .then(data => {
        if (data) {
          return data;
        }
      })
  }

  createUser = (data) => {
    return fetch(`${this.baseUrl}/create-user`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleOriginalResponse)
      .then(data => {
        if (data) {
          return data;
        }
      })
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

  getTeacher = (id) => {
    return fetch(`${this.baseUrl}/teachers/${id}`, {
      method: 'POST',
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

export const usersApi = new Users({
  baseUrl: serverUrl,
})
