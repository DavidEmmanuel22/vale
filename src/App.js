import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes/Routes'
import ContextProvider from './context/ContextProvider'

export default function App() {
  return (
    <div>
      <ContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ContextProvider>
    </div>
  )
}
