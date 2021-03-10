import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button, Hidden, Collapse } from '@material-ui/core'
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
import DeleteNegocio from 'components/negocio/delete'
import { FilterList } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'

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
    color: theme.palette.text.secondary
  }
}))

const Negocios = () => {
  const classes = useStyles()
  const classes2 = useStyles2()

  const [openDialog, setOpenDialog] = useState(false)
  const [negocios, setNegocios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedNegocio, setSelectedNegocio] = useState(false)

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
    if (!openDialog || !deleteDialog) {
      getAllNegocios()
    }
  }, [openDialog, deleteDialog])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.buttonPaper}>
          {isLoading && <CircularProgress></CircularProgress>}
          {!isLoading && (
            <Button
              color="secondary"
              onClick={() => setShowFilters(!showFilters)}
              variant="contained"
            >
              <FilterList></FilterList>
            </Button>
          )}
          <Button
            onClick={() => setOpenDialog(true)}
            color="primary"
            variant="contained"
            style={{ float: 'right' }}
          >
            Agregar Negocio{' '}
          </Button>
          {!isLoading && (
            <div>
              <Collapse in={showFilters}>
                <Alert severity="info">
                  This feature will be added soon :)
                </Alert>
              </Collapse>
            </div>
          )}
        </Paper>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <Hidden xsDown>
                    <TableCell align="center">Correo</TableCell>
                  </Hidden>
                  <Hidden smDown>
                    <TableCell align="center">Direccion</TableCell>
                  </Hidden>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {negocios.map((negocio, index) => (
                  <TableRow key={index} role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      {negocio.estatus === 0 ? (
                        <CheckCircleIcon color="primary"></CheckCircleIcon>
                      ) : (
                        <HighlightOffRoundedIcon color="error"></HighlightOffRoundedIcon>
                      )}
                    </TableCell>
                    <TableCell align="center">{negocio.bussinesName}</TableCell>
                    <Hidden xsDown>
                      <TableCell align="center">{negocio.email}</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">
                        {negocio.bussinesAdress}
                      </TableCell>
                    </Hidden>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button
                        disabled={negocio.estatus !== 0}
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                          setSelectedNegocio(negocio)
                          setDeleteDialog(true)
                        }}
                      >
                        Delete
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
      <ResponsivePopUp
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title={'Elimina un negocio'}
      >
        <DeleteNegocio negocio={selectedNegocio}></DeleteNegocio>
      </ResponsivePopUp>
    </Grid>
  )
}

export default Negocios
