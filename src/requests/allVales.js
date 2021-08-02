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

export const chargeVale = (folio, amount, businessId, concept) => {
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
