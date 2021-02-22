import React, { useState } from 'react'
import { Paper, Grid } from '@material-ui/core'
// import IconButton from '@material-ui/core/IconButton';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PopUp from 'components/Dialog/PopUp'
import FormPerfil from 'components/Forms/FormPerfil/FormPerfil'
// import FormValedor from 'components/Forms/FormaddValedor/FormValedor'
// import AllValedores from 'components/Tables/AllValedores'
// import { People, Store } from '@material-ui/icons';
import Styles from './Styles'
import RegisterValedor from '../valedor/register'
import RegisterNegocio from 'components/negocio/register'

const CenteredGrid = () => {
  const classes = Styles()
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogName, setDialogName] = useState('valedor')
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid className={classes.MuiGrid6} item xs={6} md={6}>
          <Paper className={classes.paper}>
            <FormPerfil />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <button
              onClick={() => {
                setOpenDialog(true)
                setDialogName('valedor')
              }}
            >
              Registra un valedor
            </button>
          </Paper>
          <Paper className={classes.paper}>
            <button
              onClick={() => {
                setOpenDialog(true)
                setDialogName('negocio')
              }}
            >
              Registra un negocio
            </button>
          </Paper>
        </Grid>
      </Grid>
      <PopUp openDialog={openDialog} setOpenDialog={setOpenDialog}>
        {dialogName === 'valedor' ? (
          <RegisterValedor></RegisterValedor>
        ) : (
          <RegisterNegocio></RegisterNegocio>
        )}
      </PopUp>
    </div>
  )
}

export default CenteredGrid
