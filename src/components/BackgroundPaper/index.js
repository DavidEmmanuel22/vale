import React from 'react'

import Image from '../../images/valedor-green.png'
import './index.css'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
  return (
    <React.Fragment>
      <div className="hero-image" style={{ backgroundImage: `url(${Image})` }}>
        <div className="hero-text">
          <h3>Nuevos mensajes</h3>
          <h1>50</h1>
          <Link to="/dashboard" style={{ width: '100%', display: 'flex' }}>
            <Button variant="contained" color="secondary">
              Ver Más
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BackgroundPaper
