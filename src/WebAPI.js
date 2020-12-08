const BASE_URL = 'https://student-json-api.lidemy.me'

export const getPosts = () => {
    return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
      .then(res => res.json())
}

export const login = (username, password) => {
  return (
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => res.json())
  )
}

export const getMe = () => {
  const token = localStorage.getItem('token');
  return (
    fetch(`${BASE_URL}/me`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
  )
}

export const getSinglePage = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`)
  .then(res => res.json())
}


export const getListPage = (page) => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=5`)
  .then(res => res.json())
}

export const newPost = (title, body) => { 
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    })
  })
  .then(res => res.json())
}

export const registerUser = (nickname, username, password) => {

  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nickname,
      username,
      password
    })
  })
  .then(res => res.json())
  
}