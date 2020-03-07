import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})

export const userSignup = async (signupData) => {
  const res = await api.post('/user/', signupData)
  console.log(res)
}
