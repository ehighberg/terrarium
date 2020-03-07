import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})

export const userSignup = async (signupData) => {
  await api.post('/user/', signupData)
}

export const userLogin = async (loginData) => {
  const res = await api.post('auth/login', loginData)
  localStorage.setItem('authToken', res.data.token)
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
  console.log(res.data.user)
  return res.data.user
}
