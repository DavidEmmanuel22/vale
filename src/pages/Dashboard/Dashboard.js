import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import { BusinessCenter, DirectionsBusSharp } from '@material-ui/icons'
// import moment from 'moment'
import {
  Button,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { number } from 'yup/lib/locale'
import './index.css'
import AddIcon from '@material-ui/icons/Add'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import RegisterValedor from 'components/valedor/register'
import RegisterNegocio from 'components/negocio/register'
import RegisterCredit from 'components/credito/register'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: '10px'
  },
  paperFlex: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex'
  },
  button: {
    color: 'blue'
  },
  text: {
    textAlign: 'center',
    fontSize: '20px'
  },
  number: {
    fontSize: '15px',
    backgroundColor: 'blue',
    borderRadius: '5px',
    padding: '2px',
    paddingRight: '6px',
    paddingLeft: '6px',
    marginRight: '5px',
    color: 'white'
  }
}))

const columns = [
  { id: 'name', label: 'Nombre' },
  { id: 'email', label: 'Correo' },
  { id: 'adress', label: 'Direccion' },
  { id: 'actions', label: 'Acciones' }
]

export default function CenteredGrid() {
  const classes = useStyles()
  const [showDialog, setShowDialog] = useState(false)
  const [dialogName, setDialogName] = useState('valedor')

  const handleDialog = () => {
    if (dialogName === 'valedor') {
      return (
        <ResponsivePopUp
          open={showDialog}
          setOpen={setShowDialog}
          title={'Registra un valedor'}
        >
          <RegisterValedor></RegisterValedor>
        </ResponsivePopUp>
      )
    }
    if (dialogName === 'negocio') {
      return (
        <ResponsivePopUp
          open={showDialog}
          setOpen={setShowDialog}
          title={'Registra un negocio'}
        >
          <RegisterNegocio></RegisterNegocio>
        </ResponsivePopUp>
      )
    }
    return (
      <ResponsivePopUp
        open={showDialog}
        setOpen={setShowDialog}
        title={'Agrega credito a valedor'}
      >
        <RegisterCredit></RegisterCredit>
      </ResponsivePopUp>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container className="dashboard-container" spacing={2}>
        <Grid item xs={12}>
          <Hidden smDown>
            <Paper className={classes.paperFlex} elevation={0}>
              <p>
                <span>50</span> Negocios Activos
              </p>
              <p style={{ marginLeft: '40px' }}>
                <span>100</span> Valedores Activos
              </p>
              <p style={{ marginLeft: 'auto' }}></p>
            </Paper>
          </Hidden>
          <Hidden mdUp>
            <h1 className="dashboard-title">Dashboard</h1>
            <Paper className={classes.paper} elevation={0}>
              <p>
                <span>50</span> Negocios Activos
              </p>
            </Paper>
            <Paper className={classes.paper} elevation={0}>
              <p>
                <span>100</span> Valedores Activos
              </p>
            </Paper>
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <a
            className="register-button"
            href="#"
            onClick={() => {
              setShowDialog(true)
              setDialogName('valedor')
            }}
          >
            <div>
              <AddIcon
                style={{ color: 'white', width: '100%', textAlign: 'center' }}
              ></AddIcon>
            </div>
            <p>Agregar Valedor</p>
          </a>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <a
            className="register-button"
            href="#"
            onClick={() => {
              setShowDialog(true)
              setDialogName('negocio')
            }}
          >
            <div>
              <AddIcon
                style={{ color: 'white', width: '100%', textAlign: 'center' }}
              ></AddIcon>
            </div>
            <p>Agregar Negocio</p>
          </a>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <a
            className="register-button"
            href="#"
            onClick={() => {
              setShowDialog(true)
              setDialogName('credit')
            }}
          >
            <div>
              <AddIcon
                style={{ color: 'white', width: '100%', textAlign: 'center' }}
              ></AddIcon>
            </div>
            <p>Agregar Credito</p>
          </a>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableHead className="table-messages-head">
                  <TableRow>
                    <TableCell align="center" style={{ color: 'white' }}>
                      Nuevos Mensajes
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={2}>
                          <InsertCommentIcon color="primary"></InsertCommentIcon>
                        </Grid>
                        <Grid item xs={6}>
                          Nombre
                        </Grid>
                        <Grid item xs={4}>
                          3/03/2021
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={2}>
                          <InsertCommentIcon color="primary"></InsertCommentIcon>
                        </Grid>
                        <Grid item xs={6}>
                          Nombre
                        </Grid>
                        <Grid item xs={4}>
                          3/03/2021
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={2}>
                          <InsertCommentIcon color="primary"></InsertCommentIcon>
                        </Grid>
                        <Grid item xs={6}>
                          Nombre
                        </Grid>
                        <Grid item xs={4}>
                          3/03/2021
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={2}>
                          <InsertCommentIcon color="primary"></InsertCommentIcon>
                        </Grid>
                        <Grid item xs={6}>
                          Nombre
                        </Grid>
                        <Grid item xs={4}>
                          3/03/2021
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableHead className="table-messages-head">
                  <TableRow>
                    <TableCell align="center" style={{ color: 'white' }}>
                      Vales Pendientes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={3}>
                          123456
                        </Grid>
                        <Grid item xs={3}>
                          3/03/2021
                        </Grid>
                        <Grid item xs={3}>
                          Negocio
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="outlined" color="primary">
                            Asignar
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={3}>
                          123456
                        </Grid>
                        <Grid item xs={3}>
                          3/03/2021
                        </Grid>
                        <Grid item xs={3}>
                          Negocio
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="outlined" color="primary">
                            Asignar
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={3}>
                          123456
                        </Grid>
                        <Grid item xs={3}>
                          3/03/2021
                        </Grid>
                        <Grid item xs={3}>
                          Negocio
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="outlined" color="primary">
                            Asignar
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={3}>
                          123456
                        </Grid>
                        <Grid item xs={3}>
                          3/03/2021
                        </Grid>
                        <Grid item xs={3}>
                          Negocio
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="outlined" color="primary">
                            Asignar
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={3}>
                          123456
                        </Grid>
                        <Grid item xs={3}>
                          3/03/2021
                        </Grid>
                        <Grid item xs={3}>
                          Negocio
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="outlined" color="primary">
                            Asignar
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {showDialog && handleDialog()}
    </div>
  )
}
