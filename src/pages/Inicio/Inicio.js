import React from 'react'
import Green from 'images/valedor-green.png'
import Map from 'images/location-map.png'
import Hero from 'images/valedor-hero.jpg'
// import { Button, Typography } from '@material-ui/core'
import Styles from './Styles'

const Inicio = () => {
  const classes = Styles()

  return (
    <div className={classes.ContentHome}>
      <div className={classes.ContentHero}>
        <img className={classes.ImageHero} src={Hero} alt="Hero"></img>
      </div>
      <div>
        <div className={classes.ContentGreen}>
          <img className={classes.ImageGreen} src={Green} alt="logo"></img>
        </div>
      </div>
      <div className={classes.ContentMap}>
        <div className={classes.LocationMap}>
          <img className={classes.ImageMap} src={Map} alt="Map"></img>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  )
}
export default Inicio
