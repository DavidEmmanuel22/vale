import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PopUp from 'components/Dialog/PopUp'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { getNegocios } from 'requests/allNegocios'
import RegisterNegocio from 'components/negocio/register'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResponsivePopUp from 'components/popUp/responsivePopUp'

const columns = [
  { id: 'name', label: 'Nombre' },
  { id: 'email', label: 'Correo' },
  { id: 'adress', label: 'Direccion' },
  { id: 'actions', label: 'Acciones' }
]

const useStyles2 = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  buttonPaper: {
    padding: theme.spacing(2),
    //textAlign: 'right',
    color: theme.palette.text.secondary
  }
}))

const Negocios = () => {
  const classes = useStyles()
  const classes2 = useStyles2()

  const [openDialog, setOpenDialog] = useState(false)
  const [negocios, setNegocios] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getAllNegocios() {
      setIsLoading(true)
      const { success, response, error } = await getNegocios()
      if (success && response) {
        setNegocios(response)
        setIsLoading(false)
      } else {
        console.log(error)
      }
    }
    !openDialog && getAllNegocios()
  }, [openDialog])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.buttonPaper} style={{ display: 'flex' }}>
          {isLoading && <CircularProgress></CircularProgress>}
          <Button
            onClick={() => setOpenDialog(true)}
            color="primary"
            variant="contained"
            style={{ marginLeft: 'auto' }}
          >
            Agregar Negocio
          </Button>
        </Paper>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, i) => (
                    <TableCell key={i} align="center">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {negocios.map((negocio, index) => (
                  <TableRow key={index} role="checkbox" tabIndex={-1}>
                    <TableCell align="center">{negocio.bussinesName}</TableCell>
                    <TableCell align="center">{negocio.email}</TableCell>
                    <TableCell align="center">
                      {negocio.bussinesAdress}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button color="secondary" variant="outlined">
                        Delete{' '}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <ResponsivePopUp
        open={openDialog}
        setOpen={setOpenDialog}
        title={'Registra un negocio'}
      >
        <RegisterNegocio></RegisterNegocio>
      </ResponsivePopUp>
    </Grid>
  )
}

export default Negocios
