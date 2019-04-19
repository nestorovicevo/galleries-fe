import axios from 'axios'

class Auth {

  constructor() {
    this.setAxiosDefaultAuthorizatonHeader()
  }

  login(credentials) {
    return axios.post('http://localhost:8000/api/auth/login', credentials)
      .then(response => response.data)
  }

  storeAuthData(token, userId) {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  getLoggedInUserId() {
    return localStorage.getItem('userId')
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    axios.post('http://localhost:8000/api/auth/logout')
  }

  register(credencials) {
    return axios.post(
      'http://localhost:8000/api/auth/register',
      credencials
    )
  }

  setAxiosDefaultAuthorizatonHeader() {
    const token = localStorage.getItem('token')

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

}

export const authService = new Auth()