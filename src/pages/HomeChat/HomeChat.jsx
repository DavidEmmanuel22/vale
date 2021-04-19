import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import './HomeChat.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex',
      margin: theme.spacing(1),
      width: '25ch',
      flexDirection: 'column'
    }
  }
}))
export const HomeChat = () => {
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }
  const classes = useStyles()
  return (
    <form className={classes.root} autoComplete="off">
      <TextField id="outlined-basic" label="Nombre" variant="outlined" />
      <TextField
        id="outlined-basic"
        label="Correo electronico"
        variant="outlined"
      />
    </form>
  )
}
