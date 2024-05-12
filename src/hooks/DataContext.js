import { createContext, useState } from 'react'

export const CountCartContext = createContext()

export const CountCartProvider = ({ children }) => {
    const [countCart, setCountCart] = useState(0)
    return (
        <CountCartContext.Provider value={{ countCart, setCountCart }}>
            {children}
        </CountCartContext.Provider>
    )
}
