import React from 'react'
import Green from 'images/valedor-green.png'
import Map from 'images/location-map.png'
import Hero from 'images/valedor-hero.jpg'
import Footer from 'images/image.png'
import { Button, Container,Typography } from '@material-ui/core'
import Styles from './Styles'


const Inicio = () => {
  const classes = Styles()
  return (
    <div>
      <div className={classes.ContentHero}>
        <img className={classes.ImageHero} src={Hero} alt="Hero"></img>
        <Container className={classes.ContentJointo}>
         <h4 className={classes.BlackText}>
          Necesitas presupuesto para emprender tu negocio?
         </h4>
         <h1 className={classes.JoinText}>Únete a Vale</h1>
         <h1 className={classes.ValedorText}>Valedor</h1>
         <Button className={classes.KnowMore} size="small">
          Conoce más
        </Button>
        </Container>
      </div>
      <div>
        <div className={classes.ContentGreen}>
          <img className={classes.ImageGreen} src={Green} alt="logo"></img>
          <Container className={classes.ContentAdvantage}>
           <h4 className={classes.WhiteText}>Descubre las ventajas de ser un valedor</h4>
           <h1 className={classes.BeValedor}>Quieres ser un Valedor</h1>
           <Typography className={classes.TextFake}>
             Lorem ipsum dolor sit amet consectetur adipiscing elit, leo erat
             bibendum sed torquent lectus, sapien auctor cum diam praesent
             malesuada. Himenaeos bibendum nec ac vivamus viverra mattis orci
             penatibus, magna accumsan nisl augue donec porttitor nostra
           </Typography>
           <Button className={classes.KnowMore} size="small">
             Conoce más
           </Button>
         </Container>
        </div>
      </div>
      <div className={classes.ContentMap}>
        <div className={classes.LocationMap}>
          <img className={classes.ImageMap} src={Map} alt="Map"></img>
          <Container className={classes.ContentMapText}>
          <h4 className={classes.WhiteText}>Afiliate a Vale Valedor</h4>
          <h1 className={classes.BeValedor}>Quieres que nuestros Vales se usen en tu negocio?</h1>
          <Typography className={classes.TextFake}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, leo erat
            bibendum sed torquent lectus, sapien auctor cum diam praesent
            malesuada. Himenaeos bibendum nec ac vivamus viverra mattis orci
            penatibus, magna accumsan nisl augue donec porttitor nostra
          </Typography>
          <Button className={classes.KnowMore} size="small">
            Conoce más
          </Button>
          </Container>
        </div>
      </div>
        <div className={classes.ContentGreen}>
         <img className={classes.ImageFooter} src={Footer} alt="Footer"></img>
        </div>
    </div>
  )
}
export default Inicio
