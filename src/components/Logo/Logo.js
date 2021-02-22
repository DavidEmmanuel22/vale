import React from 'react'
// import LogoPng from '../../images/logo-appbar.png'
import Styles from './Styles'

const Logo = () => {
  const classes = Styles()
  return (
    <img
      className={classes.Toolbarlogo}
      alt="Logo-Valedor"
      src={'logo192-png'}
    />
  )
}

export default Logo
