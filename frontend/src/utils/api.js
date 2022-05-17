const apiConfig = {
    baseUrl: 'http://localhost:3001',
    headers: {
    'Content-Type': 'application/json'
    }
};


class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    static checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch (`${this._baseUrl}/users/me`, { headers: this._headers }).then(Api.checkResponse);
    }
    getInitialCards() {
        return fetch (`${this._baseUrl}/cards`, { headers: this._headers }).then(Api.checkResponse);
    }

    setAvatar({ avatar_url }) {
        return fetch (
            `${this._baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({ avatar: avatar_url }),
            })
        .then(Api.checkResponse);
    }

    setUserInfo({ name, about }) {
        return fetch (
            `${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about,
                }),
            })
        .then(Api.checkResponse);
    }

    addCard(data) {
        return fetch (
            `${this._baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link,
                }),
            })
        .then(Api.checkResponse);
    }

    deleteCard(id) {
        return fetch (
            `${this._baseUrl}/cards/${id}`, {
                method: "DELETE",
                headers: this._headers
            })
        .then(Api.checkResponse);
    }

    _putCardLike(id) {
        return fetch (
            `${this._baseUrl}/cards/${id}/likes`, {
                method: "PUT",
                headers: this._headers
            })
        .then(Api.checkResponse);
    }

    _deleteCardLike(id) {
        return fetch (
            `${this._baseUrl}/cards/${id}/likes`, {
                method: "DELETE",
                headers: this._headers
            })
        .then(Api.checkResponse);
    }

    likeCard(cardid, isliked) {
        return isliked ? this._putCardLike(cardid) : this._deleteCardLike(cardid);
    }

}

const api = new Api(apiConfig);

export default api;