import noTokenRequest from './noTokenRequest'

export const createMail = (message) => {
  return noTokenRequest(`/create-chat`, {
    method: 'POST',
    body: JSON.stringify(message)
  })
}

export const messageHistory = (idChat) => {
  return noTokenRequest(`/get-message?idChat=${idChat}`, {
    method: 'GET'
  })
}
