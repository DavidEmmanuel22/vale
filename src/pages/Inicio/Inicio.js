import React from 'react'
import Green from 'images/valedor-green.png'
import Map from 'images/location-map.png'
import Hero from 'images/valedor-hero.jpg'
import Styles from './Styles'

const Inicio = () => {
  const classes = Styles()

  return (
    <div>
      <div className={classes.ContentHero}>
        <img className={classes.ImageHero} src={Hero} alt="Hero"></img>
      </div>
      <div>
        <div>
          <img src={Green} alt="logo"></img>
        </div>
        <div></div>
      </div>
      <div className={classes.ContentMap}>
        <div></div>
        <div className={classes.LocationMap}>
          <img className={classes.ImageMap} src={Map} alt="Map"></img>
        </div>
      </div>
    </div>
  )
}
export default Inicio
