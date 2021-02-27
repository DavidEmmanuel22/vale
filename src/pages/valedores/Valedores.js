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
import { getValedores } from 'requests/allValedores'
import RegisterValedor from 'components/valedor/register'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResponsivePopUp from 'components/popUp/responsivePopUp'

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
  const [valedores, setValedores] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getAllValedores() {
      setIsLoading(true)
      const allValedores = await getValedores()
      setValedores(allValedores)
      console.log(allValedores)
      setIsLoading(false)
    }
    getAllValedores()
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
            Agregar Valedor
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
                {valedores.map((valedor, index) => (
                  <TableRow key={index} role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      {valedor.firstName} {valedor.lastName}
                    </TableCell>
                    <TableCell align="center">{valedor.email}</TableCell>
                    <TableCell align="center">{valedor.credits}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button color="secondary" variant="outlined">
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
    </Grid>
  )
}

export default Valedores
