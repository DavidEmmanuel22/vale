import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useHistory } from 'react-router'

export const SessionExpired = () => {
  const [open, setOpen] = React.useState(true)
  const history = useHistory()

  const handleClose = () => {
    setOpen(false)
    history.push('/contact')
    localStorage.removeItem('idChat')
    localStorage.removeItem('email')
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Sesión Finalizada'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            minus velit excepturi pariatur iusto, fuga aut natus dolorem
            mollitia eius in molestiae. Odio omnis reprehenderit qui molestias
            tempora sit minima!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
