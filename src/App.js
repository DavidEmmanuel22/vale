import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes/Routes'
import ContextProvider from './context/ContextProvider'
import { ThemeProvider } from '@material-ui/styles'
import blueTheme from 'themes'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function App() {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

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
