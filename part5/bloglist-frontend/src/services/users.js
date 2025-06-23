import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/users`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, getById } 