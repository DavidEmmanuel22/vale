export const BASE_API_URL = 'https://devbackend.valevaledor.com'

const fetchRequest = async (requestPath, requestParams = {}, headers = {}) => {
  try {
    const response = await fetch(`${BASE_API_URL}${requestPath}`, {
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      ...requestParams
    })

    const responseAsJson = await response.json()

    return {
      success: true,
      response: responseAsJson
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

export default fetchRequest
