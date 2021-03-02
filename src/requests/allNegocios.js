import { GetRequest } from './axiosRequest'

export const getNegocios = () => {
  return GetRequest('users-valedor?role=Bussines', {})
}
