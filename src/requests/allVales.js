import fetchRequest from './fetchRequest'

export const createVale = (vale) => {
  return fetchRequest(
    `/vale`,
    {
      method: 'POST',
      body: JSON.stringify(vale)
    },
    {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
  )
}
