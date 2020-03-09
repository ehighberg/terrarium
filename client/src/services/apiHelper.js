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

// export const getUser = async (id) => {
//   const res = await api.get(`user/${id}`)
//   console.log(res.data)
//   return res.data
// }

export const verifyUser = async () => {
  const prevToken = localStorage.getItem('authToken') || null
  if (prevToken) {
        api.defaults.headers.common.authorization = `Bearer ${prevToken}`
    try {
      const res = await api.get('auth/verify')
      localStorage.setItem('authToken', res.data.token)
      api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
      return res.data.user
    } catch(e) {
      localStorage.removeItem('authToken')
      api.defaults.headers.common.authorization = ''
      console.log(e)
    }
  } else {
    return { error: 'No set authorization token'}
  }
}
