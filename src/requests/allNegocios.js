import { GetRequest } from './axiosRequest'
import fetchRequest from './fetchRequest'

export const createNegocio = (negocio) => {
  return fetchRequest(
    `/register`,
    {
      method: 'POST',
      body: JSON.stringify(negocio)
    },
    {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
  )
}

export const getNegocios = () => {
  return fetchRequest(
    `/users-valedor?role=Bussines`,
    {
      method: 'GET'
    },
    {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
  )
}
