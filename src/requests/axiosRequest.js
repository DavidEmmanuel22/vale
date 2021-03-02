import axios from 'axios'

const token = localStorage.getItem('auth-token')

export const GetRequest = async (path, body) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(
      `https://devbackend.valevaledor.com/${path}`,
      body,
      config
    )
    return response.data
  } catch (error) {
    return { msg: error }
  }
}

export const PostRequest = async (path, body) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.post(
      `https://devbackend.valevaledor.com/${path}`,
      body,
      config
    )
    return response.data
  } catch (error) {
    return { msg: error }
  }
}

export const PutRequest = async (path, body) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.put(
      `https://devbackend.valevaledor.com/${path}`,
      body,
      config
    )
    return response.data
  } catch (error) {
    return { msg: error }
  }
}
