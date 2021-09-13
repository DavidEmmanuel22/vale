import fetchRequest from './fetchRequest'

export const createVale = vale => {
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

export const chargeVale = (folio, amount, concept) => {
    return fetchRequest(
        `/vale-usado`,
        {
            method: 'PUT',
            body: JSON.stringify({
                id: folio,
                credits: amount,
                concept
            })
        },
        {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`
        }
    )
}

export const getBusinessHistory = (purchaseDate = false, idBussines = '') => {
    // return fetchRequest(
    //     `/get-purchase${purchaseDate ? `?datePurchaseString=${purchaseDate}&idBussines=${idBussines}` : ''}?idBussines=${idBussines}`,
    //     {
    //         method: 'GET'
    //     }
    // )
    return fetchRequest(
        `/get-purchase${
            purchaseDate ? `?datePurchaseString=${purchaseDate}&idBussines=${idBussines}` : `?idBussines=${idBussines}`
        }`,
        {
            method: 'GET'
        }
    )
}
