import { UserContext } from 'context/userContext'
import React from 'react'

function useUser() {
    const { user } = React.useContext(UserContext)
    if (user === undefined) {
        throw new Error('useUser must be used inside context provider')
    }
    return user
}

export default useUser
