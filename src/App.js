import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes/Routes'
import ContextProvider from './context/ContextProvider'
import { ThemeProvider } from '@material-ui/styles'
import { blueTheme } from 'themes'

export default function App() {
  return (
    <div>
      <ThemeProvider theme={blueTheme}>
        <ContextProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ContextProvider>
      </ThemeProvider>
    </div>
  )
}
