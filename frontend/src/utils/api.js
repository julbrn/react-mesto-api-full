import { BASE_URL } from './constants';

class Api {
  constructor({ serverUrl, headers }) {
    this._headers = headers;
    this._serverUrl = serverUrl;
  }
  /**проверяем ответ сервера*/
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      "Authorization": `Bearer ${jwt}`,
      ...this._headers
    }
  }

  /**получаем карточки с сервера*/
  downloadInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then(this._checkServerResponse);
  }

  /** загружаем новую карточку*/
  uploadCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkServerResponse);
  }

  /** удаляем карточку*/
  deleteCardfromServer(id) {
    return fetch(`${this._serverUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._checkServerResponse);
  }

  /** передаем лайк на сервер*/
  sendCardLike(id) {
    return fetch(`${this._serverUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
      .then(this._checkServerResponse);
  }

  /** убираем поставленный лайк с сервера*/
  deleteCardLike(id) {
    return fetch(`${this._serverUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._checkServerResponse)
  }

  /**загружаем информацию о юзере с сервера */
  getUserInfo() {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
      .then(this._checkServerResponse);
  }

  /**отправляем новую информацию о юзере на сервер */
  uploadUserInfo(userData) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(this._checkServerResponse);
  }

  /**меняем аватарку */
  editAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkServerResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.sendCardLike(cardId);
    } else {
      return this.deleteCardLike(cardId);
    }
  }
}



const api = new Api({
  serverUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
