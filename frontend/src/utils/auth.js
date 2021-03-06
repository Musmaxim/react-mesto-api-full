export const BASE_URL = 'https://api.musmaxim.students.nomoredomains.work';

const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`${res.status}`);
    }
    return res.json()
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(res => checkResponse(res))
}


export const authorize = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(res => checkResponse(res)) 
}

export const checkToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
    .then(checkResponse)
}