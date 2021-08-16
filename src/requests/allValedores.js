import { GetRequest, PostRequest, PostRequest2 } from './axiosRequest'
import fetchRequest from './fetchRequest'
import valeHTMLRequest from './valeHTMLRequest'

export const getValedores = () => {
    return fetchRequest(`/users-valedor?role=Valedor`, {
        method: 'GET'
    })
}

export const createValedor = valedor => {
    return fetchRequest(`/register`, {
        method: 'POST',
        body: JSON.stringify(valedor)
    })
}

export const uploadImage = (image, imageTitle) => {
    return fetchRequest('/upload-picks', {
        method: 'POST',
        body: JSON.stringify({
            imageBase: image,
            nameImage: imageTitle
        })
    })
}

export const updateUser = (userId, user) => {
    return fetchRequest('/update-users', {
        method: 'PUT',
        body: JSON.stringify({
            id: userId,
            ...user
        })
    })
}

export const deleteValedor = email => {
    return fetchRequest(`/delete-user`, {
        method: 'PUT',
        body: JSON.stringify({ email })
    })
}

export const enableValedor = email => {
    return fetchRequest(`/enable-user`, {
        method: 'PUT',
        body: JSON.stringify({ email })
    })
}

export const addCredit = (email, credits) => {
    return fetchRequest('/update-credits', {
        method: 'PUT',
        body: JSON.stringify({ email, credits })
    })
}

export const valesHistory = emailUser => {
    return fetchRequest(`/vales?emailUser=${emailUser}`, {
        method: 'GET'
    })
}

export const valeHistory = userId => {
    return valeHTMLRequest(`/vales-id`, {
        method: 'POST',
        body: JSON.stringify({ id: userId })
    })
}

export const createVale = vale => {
    return fetchRequest(`/vale`, {
        method: 'POST',
        body: JSON.stringify(vale)
    })
}

export const getCredit = () => {
    return fetchRequest('/get-credits', {
        method: 'GET'
    })
}
