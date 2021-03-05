import { GetRequest, PostRequest, PostRequest2 } from './axiosRequest'
import fetchRequest from './fetchRequest'

export const getValedores = () => {
  return fetchRequest(
    `/users-valedor?role=Valedor`,
    {
      method: 'GET'
    },
    {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
  )
}

export const createValedor = (valedor) => {
  return fetchRequest(
    `/register`,
    {
      method: 'POST',
      body: JSON.stringify(valedor)
    },
    {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
  )
}

export const updateUser = (userId, user) => {
  return fetchRequest(
    '/update-users',
    {
      method: 'PUT',
      body: JSON.stringify({
        id: userId,
        ...user
      })
    },
    {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
  )
}
