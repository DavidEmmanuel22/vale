import React, { useEffect, useState } from 'react'

import Image from '../../images/valedor-green.png'
import './index.css'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { countMessagesNotRead } from 'requests/createMail'

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundColor: '#cccccc',
    height: '100px',
    backgroundPosition: 'center',
    backgroundRepeat: 'noRepeat',
    backgroundSize: 'cover',
    position: 'relative'
  }
}

const BackgroundPaper = () => {
  const [notReadMessage, setNotReadMessage] = useState('')
  useEffect(() => {
    async function notReadMessage() {
      const { success, response, error } = await countMessagesNotRead()
      if (success && response) {
        setNotReadMessage(response.data)
      } else {
        //console.log(error)
      }
    }
    notReadMessage()
  }, [])
  return (
    <React.Fragment>
      <div className="hero-image" style={{ backgroundImage: `url(${Image})` }}>
        <div className="hero-text">
          {!notReadMessage ? (
            <>
              <CircularProgress
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '46%'
                }}
                size={24}
                color="secondary"
              />
              <h2>Cargando Mensajes...</h2>
            </>
          ) : (
            <div>
              <h3>Nuevos mensajes</h3>
              <h1>{notReadMessage}</h1>
              <Link to="/dashboard" style={{ width: '100%', display: 'flex' }}>
                <Button variant="contained" color="secondary">
                  Ver Más
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default BackgroundPaper
