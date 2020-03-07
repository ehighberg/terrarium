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
  return res.data.user
}

export const userEdit = async (editData, id) => {
  const res = await api.put(`user/${id}`, editData)
  console.log(res.data)
}

export const getUser = async (userName, id) => {
  const res = await api.get(`user/${id}`)
  console.log(res.data)
  return res.data
}
