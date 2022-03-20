export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`${res.status}`);
    }
    return res.json()
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(res => checkResponse(res))
}


export const authorize = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(res => checkResponse(res)) 
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(checkResponse)
}