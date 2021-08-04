import React, { useState } from 'react'

const useFilter = (initialState = [], properties = [], initialSearch) => {
    const [totalItems, setTotalItems] = useState(initialState)
    const [toSearch, setToSearch] = useState(initialSearch)

    function fetchFromObject(obj, prop) {
        if (typeof obj === 'undefined') {
            return false
        }
        const _index = prop.indexOf('.')
        if (_index > -1) {
            return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1))
        }
        return obj[prop]
    }

    const filteredItems = totalItems.filter(item => {
        let contains = false
        properties.forEach(property => {
            const prop = fetchFromObject(item, property)
            if (prop && prop.toLowerCase().includes(toSearch.toLowerCase())) {
                contains = true
            }
        })
        return contains
    })

    return [filteredItems, setTotalItems, setToSearch]
}

export default useFilter
