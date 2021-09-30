import { GetRequest } from './axiosRequest'
import fetchRequest from './fetchRequest'

export const createNegocio = negocio => {
    return fetchRequest(`/register`, {
        method: 'POST',
        body: JSON.stringify(negocio)
    })
}

export const getNegocios = () => {
    return fetchRequest(`/users-valedor?role=Bussines`, {
        method: 'GET'
    })
}

export const deleteNegocio = email => {
    return fetchRequest(`/delete-user`, {
        method: 'PUT',
        body: JSON.stringify({ email })
    })
}

export const deleteValedor = email => {
    return fetchRequest(`/delete-user`, {
        method: 'PUT',
        body: JSON.stringify({ email })
    })
}

export const enableNegocio = email => {
    return fetchRequest(`/enable-user`, {
        method: 'PUT',
        body: JSON.stringify({ email })
    })
}

export const getSingleBusinessHistory = (idBusiness, page = 1) => {
    return fetchRequest(`/get-purchase?idBussines=${idBusiness}&page=${page}`, {
        method: 'GET'
    })
}
