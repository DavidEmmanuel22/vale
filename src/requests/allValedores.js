import { GetRequest, PostRequest, PostRequest2 } from './axiosRequest'
import fetchRequest from './fetchRequest'

export const getValedores = () => {
  return fetchRequest(`/users-valedor?role=Valedor`, {
    method: 'GET'
  })
}

export const createValedor = (valedor) => {
  return fetchRequest(`/register`, {
    method: 'POST',
    body: JSON.stringify(valedor)
  })
}

export const updateUser = (userId, user) => {
  return fetchRequest('/update-users', {
    method: 'PUT',
    body: JSON.stringify({
      id: userId,
      ...user
    })
  })
}

export const deleteValedor = (email) => {
  return fetchRequest(`/delete-user`, {
    method: 'PUT',
    body: JSON.stringify({ email })
  })
}

export const enableValedor = (email) => {
  return fetchRequest(`/enable-user`, {
    method: 'PUT',
    body: JSON.stringify({ email })
  })
}

export const addCredit = (email, credits) => {
  return fetchRequest('/update-credits', {
    method: 'PUT',
    body: JSON.stringify({ email, credits })
  })
}

export const valesHistory = (emailUser) => {
  return fetchRequest(`/vales?emailUser=${emailUser}`, {
    method: 'GET'
  })
}
