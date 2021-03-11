import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button, Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PopUp from 'components/Dialog/PopUp'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { getValedores } from 'requests/allValedores'
import RegisterValedor from 'components/valedor/register'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'
import DeleteValedor from 'components/valedor/delete'

const columns = [
  { id: 'name', label: 'Nombre' },
  { id: 'email', label: 'Correo' },
  { id: 'credit', label: 'Credito' },
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

const Valedores = () => {
  const classes = useStyles()
  const classes2 = useStyles2()

  const [openDialog, setOpenDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedValedor, setSelectedValedor] = useState({})
  const [valedores, setValedores] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getAllValedores() {
      setIsLoading(true)
      const { success, response, error } = await getValedores()
      if (success && response) {
        setValedores(response.data)
        setIsLoading(false)
      } else {
        console.log(error)
      }
    }
    if (!openDialog || !deleteDialog) {
      getAllValedores()
    }
  }, [openDialog, deleteDialog])

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
            Agregar Valedor
          </Button>
        </Paper>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <Hidden smDown>
                    <TableCell align="center">Correo</TableCell>
                  </Hidden>
                  <TableCell align="center">Credito</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valedores.map((valedor, index) => (
                  <TableRow key={index} role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      {valedor.estatus === 0 ? (
                        <CheckCircleIcon color="primary"></CheckCircleIcon>
                      ) : (
                        <HighlightOffRoundedIcon color="error"></HighlightOffRoundedIcon>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {valedor.firstName} {valedor.lastName}
                    </TableCell>
                    <Hidden smDown>
                      <TableCell align="center">{valedor.email}</TableCell>
                    </Hidden>
                    <TableCell align="center">{valedor.credits}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedValedor(valedor)
                          setDeleteDialog(true)
                        }}
                        color="secondary"
                        variant="outlined"
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
        title={'Registra un valedor'}
        confirmText={'Confirm Text'}
      >
        <RegisterValedor></RegisterValedor>
      </ResponsivePopUp>
      <ResponsivePopUp
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title={'Elimina un valedor'}
        confirmText={'Confirm Text'}
      >
        <DeleteValedor valedor={selectedValedor}></DeleteValedor>
      </ResponsivePopUp>
    </Grid>
  )
}

export default Valedores
