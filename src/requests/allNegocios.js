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

export const getSingleBusinessHistory = (idBusiness, page = 1, startDate, endDate) => {
    console.log(page)
    console.log(startDate)
    console.log(endDate)
    let url = `/get-purchase-dates?idBussines=${idBusiness}&page=${page}`
    if (startDate) {
        url += `&firstDate=${startDate}`
    } else {
        url += `&firstDate=1-1-2020`
    }
    if (endDate) {
        url += `&lastDate=${endDate}`
    } else {
        const date = new Date()
        url += `&lastDate=${date.getUTCDate() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCFullYear()}`
    }
    console.log(url)
    return fetchRequest(url, {
        method: 'GET'
    })
}
