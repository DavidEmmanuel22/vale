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

export const createMessage = (idChat, mail, message) => {
  return noTokenRequest(`/create-message`, {
    method: 'POST',
    body: JSON.stringify(idChat, mail, message)
  })
}

export const readMessage = (idChat) => {
  return noTokenRequest(`/read-message`, {
    method: 'POST',
    body: JSON.stringify(idChat)
  })
}

export const getChats = () => {
  return noTokenRequest(`/get-chats`, {
    method: 'GET'
  })
}

export const countMessagesNotRead = () => {
  return noTokenRequest(`/message-not-read`, {
    method: 'GET'
  })
}
