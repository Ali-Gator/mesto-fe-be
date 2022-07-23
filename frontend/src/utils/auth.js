const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}
