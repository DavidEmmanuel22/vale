import { GetRequest } from './axiosRequest'

export const getValedores = () => {
  return GetRequest('users-valedor', {})
}
