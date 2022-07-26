class Api {
  constructor({baseUrl, headers, credentials}) {
    this._baseUrl = baseUrl;
    this._headers = {
      ...headers,
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    this._credentials = credentials;
  }

  _checkResult(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(res => this._checkResult(res))
      .catch(err => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(res => this._checkResult(res))
      .catch(err => console.log(err));
  }

  patchProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({name, about})
    })
      .then(res => this._checkResult(res));
  }

  postCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({name, link})
    })
      .then(res => this._checkResult(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(res => this._checkResult(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(res => this._checkResult(res));
  }

  patchAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({avatar})
    })
      .then(res => this._checkResult(res));
  }
}

export default Api;
