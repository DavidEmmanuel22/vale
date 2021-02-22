import React from 'react'
import { Button } from '@material-ui/core'
import Styles from './Styles'

const ActionButton = (props) => {
  const { children, onClick } = props
  const classes = Styles()

  return (
    <Button
      className={`${classes.root} ${classes.secondary} ${classes.primary} ${classes.ButtonBase}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default ActionButton
