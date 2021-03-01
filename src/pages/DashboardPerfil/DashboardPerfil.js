import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const DashboardPerfil = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <form noValidate autoComplete="off ">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} spacing={3}>
                  <img
                    width="100"
                    src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                  ></img>
                </Grid>
                <Grid item xs={12} sm={4} spacing={3}>
                  <TextField
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Nombre"
                  />
                  <TextField
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Apellido"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Email"
                  />
                  <TextField
                    style={{ width: '100%' }}
                    id="standard-basic"
                    label="Rol"
                  />
                  <div style={{ display: 'flex' }}>
                    <Button
                      variant="contained"
                      style={{ marginLeft: 'auto', marginRight: '-100px' }}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      style={{ marginLeft: 'auto' }}
                      color="secondary"
                    >
                      Edit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default DashboardPerfil
