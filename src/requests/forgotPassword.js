import fetchRequest, { initFetchInterceptors } from './fetchRequest'

export const forgotPassword = (email) => {
  return fetchRequest(
    `/forgot-password`,
    {
      method: 'POST',
      body: JSON.stringify(email)
    },
    {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
  )
}

export const resetPassword = (password, passwordCheck) => {
  let pathname = window.location.pathname.split('/')
  pathname = pathname[pathname.length - 2]
  console.log(pathname)
  return fetchRequest(
    `/update-password`,
    {
      method: 'PUT',
      body: JSON.stringify(password, passwordCheck)
    },

    {
      Authorization: `Bearer ${pathname}`
    }
  )
}
