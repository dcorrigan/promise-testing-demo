import fetch from 'isomorphic-fetch';

export default class Api {

  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  static get(route, params) {
    return this.xhr(route, params, 'get');
  }

  static xhr(route, params, verb) {
    return fetch(route, {
      method: verb,
      credentials: 'include',
      headers: this.headers(),
      body: JSON.stringify(params),
    }).then(resp => resp.json());
  }

}
