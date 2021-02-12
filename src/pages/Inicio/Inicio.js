import React from 'react'
import Green from 'images/valedor-green.png'
import Map from 'images/location-map.png'
import Hero from 'images/valedor-hero.jpg'
import { Button } from '@material-ui/core'
import Styles from './Styles'

const Inicio = () => {
  const classes = Styles()

  return (
    <div>
      <div className={classes.ContentHero}>
        <img className={classes.ImageHero} src={Hero} alt="Hero"></img>
      </div>
      <div className={classes.ContentJointo}>
        <h4 className={classes.BlackText}>
          Necesitas presupuesto para emprender tu negocio?
        </h4>
        <h1 className={classes.JoinText}>Únete a</h1>
        <h1 className={classes.ValedorText}>Vale Valedor</h1>
        <Button size="small">Conoce más</Button>
      </div>
      <div>
        <div className={classes.ContentGreen}>
          <img className={classes.ImageGreen} src={Green} alt="logo"></img>
        </div>
        <div></div>
      </div>
      <div className={classes.ContentMap}>
        <div></div>
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
