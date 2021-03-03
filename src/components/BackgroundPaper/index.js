import React from 'react'

import Paper from '@material-ui/core/Paper'

import Image from '../../images/valedor-green.png'
import './index.css'

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
          <button>Ver Más</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BackgroundPaper
