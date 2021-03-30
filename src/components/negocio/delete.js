import { Button, Collapse, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useState, useContext } from 'react'
import { deleteNegocio } from 'requests/allNegocios'
import './deleteNegocio.css'
import { AlertContext } from '../popUp/responsivePopUp'

const DeleteNegocio = ({ negocio }) => {
  const [alertText, setAlertText] = useState('This feature will be added soon')
  const [alertColor, setAlertColor] = useState('success')
  const [showAlert, setShowAlert] = useState(false)

  const { handleClose } = useContext(AlertContext)

  const handleAcept = () => {
    removeNegocio()
  }

  const removeNegocio = async () => {
    const { success, response, error } = await deleteNegocio(negocio.email)
    if (success && response) {
      if (response.error) {
        setAlertColor('error')
        setAlertText(response.error)
      } else {
        setAlertColor('success')
        setAlertText('El negocio fue borrado')
      }
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        handleClose()
      }, 2000)
    }
  }

  return (
    <Grid container style={{ minWidth: '500px' }}>
      <Grid item xs={12} className="delete-negocio-modal">
        <Collapse in={showAlert}>
          <Alert severity={alertColor}>{alertText}</Alert>
        </Collapse>
        <p style={{ textAlign: 'center', marginBottom: '3em' }}>
          Deseas borrar el negocio:{' '}
          <span style={{ textTransform: 'uppercase' }}>
            {negocio.bussinesName}
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

export default DeleteNegocio
