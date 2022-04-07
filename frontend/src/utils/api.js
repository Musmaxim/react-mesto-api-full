const apiConfig = {
    baseUrl: 'https://api.musmaxim.students.nomoredomains.work',
    headers: {
    'Content-Type': 'application/json'
    }
};


class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._config = options;
    }

    static checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch (`${this._baseUrl}/users/me`, this._config).then(Api.checkResponse);
    }
    getInitialCards() {
        return fetch (`${this._baseUrl}/cards`, this._config).then(Api.checkResponse);
    }

    setAvatar({ avatar_url }) {
        return fetch (
            `${this._baseUrl}/users/me/avatar`,
            Object.assign(this._config, {
                method: "PATCH",
                body: JSON.stringify({ avatar: avatar_url }),
            })
        ).then(Api.checkResponse);
    }

    setUserInfo({ name, about }) {
        return fetch (
            `${this._baseUrl}/users/me`,
            Object.assign(this._config, {
                method: "PATCH",
                body: JSON.stringify({
                    name: name,
                    about: about,
                }),
            })
        ).then(Api.checkResponse);
    }

    addCard(data) {
        return fetch (
            `${this._baseUrl}/cards`,
            Object.assign(this._config, {
                method: "POST",
                body: JSON.stringify({
                    name: data.name,
                    link: data.link,
                }),
            })
        ).then(Api.checkResponse);
    }

    deleteCard(id) {
        return fetch (
            `${this._baseUrl}/cards/${id}`,
            Object.assign(this._config, {
                method: "DELETE",
                headers: this._headers
            })
        ).then(Api.checkResponse);
    }

    putCardLike(id) {
        return fetch (
            `${this._baseUrl}/cards/${id}`,
            Object.assign(this._config, {
                method: "PUT",
            })
        ).then(Api.checkResponse);
    }

    deleteCardLike(id) {
        return fetch (
            `${this._baseUrl}/cards/likes/${id}`,
            Object.assign(this._config, {
                method: "DELETE",
            })
        ).then(Api.checkResponse);
    }

    likeCard(cardid, isliked) {
        return fetch (
            `${this._baseUrl}/cards/likes/${cardid}`,
            Object.assign(this._config, {
                method: isliked ? "PUT" : "DELETE",
            })
        ).then(Api.checkResponse);
    }

}

export const api = new Api(apiConfig);