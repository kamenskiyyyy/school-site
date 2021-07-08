import {handleOriginalResponse} from "./utils";
import {serverUrl} from "./constants";

class Nav {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  getNav = () => {
    return fetch(`${this.baseUrl}/nav`, {
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

export const navApi = new Nav({
  baseUrl: serverUrl,
})
