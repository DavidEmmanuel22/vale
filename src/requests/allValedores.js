import { GetRequest, PostRequest } from './axiosRequest'

export const getValedores = () => {
  return GetRequest('users-valedor', {})
}

export const createValedor = (valedor) => {
  return PostRequest('/register', valedor)
}
