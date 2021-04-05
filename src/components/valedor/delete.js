import { Button, Collapse, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useState, useContext } from 'react'
import { deleteValedor } from 'requests/allValedores'
import './deleteValedor.css'
import { AlertContext } from '../popUp/responsivePopUp'

const DeleteValedor = ({ valedor }) => {
  const [alertText, setAlertText] = useState('')
  const [alertColor, setAlertColor] = useState('success')
  const [showAlert, setShowAlert] = useState(false)

  const { handleClose } = useContext(AlertContext)

  const handleAcept = () => {
    removeValedor()
  }

  const removeValedor = async () => {
    const { success, response, error } = await deleteValedor(valedor.email)
    if (success && response) {
      if (response.error) {
        setAlertColor('error')
        setAlertText(response.error)
      } else {
        setAlertColor('success')
        setAlertText('El valedor fue borrado')
      }
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        handleClose()
      }, 6000)
    }
  }

  return (
    <Grid container style={{ minWidth: '500px' }}>
      <Grid item xs={12} className="delete-valedor-modal">
        <Collapse in={showAlert}>
          <Alert severity={alertColor}>{alertText}</Alert>
        </Collapse>
        <p style={{ textAlign: 'center', marginBottom: '1.5em' }}>
          Deseas borrar el valedor:{' '}
          <span style={{ textTransform: 'uppercase' }}>
            {valedor.firstName}
          </span>{' '}
          ?
        </p>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ float: 'right' }}
          onClick={handleAcept}
          color="primary"
        >
          Aceptar
        </Button>
      </Grid>
    </Grid>
  )
}

export default DeleteValedor
