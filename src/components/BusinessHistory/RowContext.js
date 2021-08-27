import React from 'react'

export const RowContext = React.createContext(null)

export const RowProvider = ({ children, component }) => {
    return (
        <RowContext.Provider
            value={{
                noRowComponent: component
            }}
        >
            {children}
        </RowContext.Provider>
    )
}
