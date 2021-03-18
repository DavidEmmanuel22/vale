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
import InputBase from '@material-ui/core/InputBase'
import { getValedores, enableValedor } from 'requests/allValedores'
import RegisterValedor from 'components/valedor/register'
import numeral from 'numeral'
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
  const [searchValedor, setSearchValedor] = useState('')
  const [statusValedor, setStatusValedor] = useState(false)
  const [unableValedor, setUnableValedor] = useState(true)

  const filteredValedores = valedores.filter((valedor) => {
    if (
      valedor.firstName.toLowerCase().includes(searchValedor.toLowerCase()) ||
      valedor.lastName.toLowerCase().includes(searchValedor.toLowerCase())
    ) {
      return valedor
    } else {
      return null
    }
  })

  //console.log(selectedValedor)
  //console.log(unableValedor)

  useEffect(() => {
    async function getAllValedores() {
      setIsLoading(true)
      const { success, response, error } = await getValedores()
      if (success && response) {
        setValedores(response.data)
        setIsLoading(false)
      } else {
        //console.log(error)
      }
    }
    if (!openDialog || !deleteDialog || !statusValedor) {
      getAllValedores()
    }
  }, [openDialog, deleteDialog, statusValedor])

  const handleChange = (e) => {
    e.preventDefault()
    setSearchValedor(e.target.value)
  }

  const handleClick = async (e, valedor) => {
    e.preventDefault()
    if (valedor.estatus === 1) {
      const { success, response, error } = await enableValedor(
        selectedValedor.email
      )
      if (response.error) {
        console.log(error)
      } else {
        setStatusValedor(true)
      }
      setStatusValedor(false)
    } else {
      setDeleteDialog(true)
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          className={classes.buttonPaper}
          style={{
            display: 'flex',
            textAlign: 'center',
            marginBottom: '1.2rem',
            justifyContent: 'space-around',
            flexDirection: 'row-reverse'
          }}
        >
          <Button
            onClick={() => setOpenDialog(true)}
            color="primary"
            variant="contained"
          >
            Agregar Valedor
          </Button>
          <InputBase
            placeholder="Buscar Valedor..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchValedor}
            onChange={(e) => handleChange(e)}
          />
        </Paper>
        <Paper className={classes.paper}>
          <TableContainer>
            {isLoading && <CircularProgress></CircularProgress>}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    onClick={() => setUnableValedor(!unableValedor)}
                    style={{
                      background: `${
                        unableValedor ? 'rgb(0, 119, 114)' : '#f44336'
                      }`,
                      color: 'white',
                      borderRadius: '.3em'
                    }}
                  >
                    Estatus
                  </TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <Hidden smDown>
                    <TableCell align="center">Correo</TableCell>
                  </Hidden>
                  <TableCell align="center">Credito</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredValedores.map((valedor, index) => (
                  <TableRow key={index} role="checkbox" tabIndex={-1}>
                    <>
                      {valedor.estatus === 0 && unableValedor ? (
                        <>
                          <TableCell align="center">
                            <CheckCircleIcon color="primary"></CheckCircleIcon>
                          </TableCell>
                          <TableCell align="center">
                            {valedor.firstName} {valedor.lastName}
                          </TableCell>
                          <Hidden smDown>
                            <TableCell align="center">
                              {valedor.email}
                            </TableCell>
                          </Hidden>
                          <TableCell align="center">
                            {numeral(valedor.credits).format('$0,0')}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              color="primary"
                              style={{ marginRight: '10px' }}
                              variant="outlined"
                            >
                              Editar
                            </Button>
                            <Button
                              onClick={(e) => {
                                handleClick(e, valedor)
                              }}
                              onMouseEnter={() => setSelectedValedor(valedor)}
                              color="secondary"
                              variant={`${
                                valedor.estatus === 1 ? 'outlined' : 'contained'
                              }`}
                            >
                              Eliminar
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {valedor.estatus === 1 && !unableValedor ? (
                            <>
                              <TableCell align="center">
                                <HighlightOffRoundedIcon color="error"></HighlightOffRoundedIcon>
                              </TableCell>
                              <TableCell align="center">
                                {valedor.firstName} {valedor.lastName}
                              </TableCell>
                              <Hidden smDown>
                                <TableCell align="center">
                                  {valedor.email}
                                </TableCell>
                              </Hidden>
                              <TableCell align="center">
                                {numeral(valedor.credits).format('$0,0')}
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  onClick={(e) => {
                                    handleClick(e, valedor)
                                  }}
                                  onMouseEnter={() =>
                                    setSelectedValedor(valedor)
                                  }
                                  color="secondary"
                                  variant={`${
                                    valedor.estatus === 1
                                      ? 'outlined'
                                      : 'contained'
                                  }`}
                                >
                                  Habilitar
                                </Button>
                              </TableCell>
                            </>
                          ) : null}
                        </>
                      )}
                    </>
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
        title={'Eliminar un valedor'}
        confirmText={'Confirm Text'}
      >
        <DeleteValedor valedor={selectedValedor}></DeleteValedor>
      </ResponsivePopUp>
    </Grid>
  )
}

export default Valedores
