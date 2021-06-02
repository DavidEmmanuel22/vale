const { default: fetchRequest } = require('./fetchRequest')

export const loginUser = (email, password) => {
  return fetchRequest(`/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}
