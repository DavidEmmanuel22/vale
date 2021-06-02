import React, { useState } from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import Axios from 'axios'
import Styles from './Styles'

const FormValedor = () => {
  const classes = Styles()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [credits, setCredits] = useState()

  const submit = (event) => {
    event.preventDefault()
    const AddUser = { firstName, lastName, credits }
    Axios('https://devbackend.valevaledor.com/rgister', {
      method: 'PUT',
      body: AddUser,
      headers: {
        Accep: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => console.log(res))
      .catch((err) => console.log.error(err))
  }

  return (
    <div className={classes.FormValedor}>
      <form className={classes.FormControl} onSubmit={submit}>
        <FormControl>
          <InputLabel htmlFor="nombre">Nombre</InputLabel>
          <Input
            id="nombre"
            type="text"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
          <Input
            id="apellidos"
            type="text"
            onChange={(event) => setLastName(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="credito">Crédito</InputLabel>
          <Input
            id="credito"
            type="number"
            onChange={(event) => setCredits(event.target.value)}
          />
        </FormControl>
        <Button type="submit">Añadir</Button>
      </form>
    </div>
  )
}
export default FormValedor
