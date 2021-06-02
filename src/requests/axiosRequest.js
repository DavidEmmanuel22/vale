import axios from 'axios'

const token = localStorage.getItem('auth-token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export const GetRequest = async (path, body) => {
  try {
    const response = await axios.get(
      `https://devbackend.valevaledor.com/${path}`,
      body,
      config
    )
    return response.data
  } catch (error) {
    return { msg: JSON.stringify(error) }
  }
}

export const PostRequest = async (path, body) => {
  try {
    const response = await axios.post(
      `https://devbackend.valevaledor.com/${path}`,
      body,
      config
    )
    console.log('responseee')
    console.log(response)
    return response.data
  } catch (error) {
    console.log('error gggg')
    console.log(error)
    return { error }
  }
}

export const PostRequest2 = (path, body) => {
  axios
    .post(`https://devbackend.valevaledor.com/${path}`, body, config)
    .then(function (response) {
      console.log('failed error 0')
      return response.data
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('failed error 1')
        console.log(error.response.data)
        return error.response.data
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('failed error 2')
        console.log(error.request)
        return error.request
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
        console.log('failed error 3')
        return 'UN ERROR'
      }
    })
}

export const PutRequest = async (path, body) => {
  try {
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
