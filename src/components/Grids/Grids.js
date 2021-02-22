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

const CenteredGrid = () => {
  const classes = Styles()
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid className={classes.MuiGrid6} item xs={6} md={6}>
          <Paper className={classes.paper}>
            <FormPerfil />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Hola</Paper>
        </Grid>
      </Grid>
      <PopUp openDialog={openDialog} setOpenDialog={setOpenDialog}></PopUp>
    </div>
  )
}

export default CenteredGrid
