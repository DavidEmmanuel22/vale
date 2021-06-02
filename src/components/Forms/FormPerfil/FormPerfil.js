import React from 'react'
import Styles from './Styles'
import avatar from 'images/no-avatar.png'
import { Button, TextField, Avatar } from '@material-ui/core'

const FormPerfil = () => {
  const classes = Styles()

  return (
    <div className={classes.ContentEditPerfil}>
      <div className={classes.fotoAvatar}>
        <Avatar alt="Ceci" src={avatar} className={classes.AvatarDomy} />
        <h5>Cambiar Foto</h5>
      </div>
      <div className={classes.ContentPerfil}>
        <TextField
          className={classes.FormControl}
          id="nombre"
          label="Nombre"
          variant="filled"
        />
        <TextField
          className={classes.FormControl}
          id="apellidos"
          label="Apellidos"
          variant="filled"
        />
        <TextField
          className={classes.FormControl}
          id="contraseña"
          label="Contraseña"
          variant="filled"
        />
        <TextField
          className={classes.FormControl}
          id="email"
          label="Email"
          variant="filled"
        />
        <TextField
          className={classes.FormControl}
          id="edad"
          label="Edad"
          variant="filled"
        />
        <h5 className={classes.PerfilFoto}>Cambiar Contraseña</h5>
        <Button>Actualizar</Button>
      </div>
    </div>
  )
}
export default FormPerfil
