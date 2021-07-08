import noTokenRequest from './noTokenRequest'

export const getBusiness = () => {
  return noTokenRequest(`/users-not-token-valedor?role=Bussines`, {
    method: 'GET'
  })
}
