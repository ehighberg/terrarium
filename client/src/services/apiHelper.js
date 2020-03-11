import axios from 'axios'

const baseUrl = 'https://terrarium-ml.herokuapp.com/'

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
  try {
    const res = await api.put(`user/${id}`, editData)
  } catch(e) {
    console.error(e)
  }
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
      console.error(e)
    }
  } else {
    return { error: 'No set authorization token'}
  }
}

export const getAllExperiments = async () => {
  try {
    const res = await api.get('experiment')
    return res.data
  } catch(e) {
    console.error(e)
  }
}

export const getAllUsernames = async () => {
  try {
    const res = await api.get('user')
    const userIdToNameMap = {}
    res.data.forEach(user => {
      userIdToNameMap[user.id] = user.username
    })
    return userIdToNameMap
  } catch(e) {
    console.error(e)
  }
}

export const unauthorizeUser = () => {
  localStorage.removeItem('authToken')
  api.defaults.headers.common.authorization = ''
}
