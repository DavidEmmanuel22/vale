import axios from 'axios'

const token = localStorage.getItem('auth-token')

export const getValedores = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const valedores = await axios.get(
      'https://devbackend.valevaledor.com/users-valedor',
      {},
      config
    )
    return valedores.data
  } catch (error) {
    return { msg: error }
  }
}
