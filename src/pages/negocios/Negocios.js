import React, { useState, useEffect, useContext } from 'react'
import {
  Grid,
  Paper,
  Button,
  Hidden,
  TextField,
  InputAdornment
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import PopUp from 'components/Dialog/PopUp'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { getNegocios, enableNegocio } from 'requests/allNegocios'
import { updateUser } from 'requests/allValedores'
import RegisterNegocio from 'components/negocio/register'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import DeleteNegocio from 'components/negocio/delete'
import RefreshIcon from '@material-ui/icons/Refresh'
import { Alert } from '@material-ui/lab'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { UserContext } from 'context/userContext'

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
  fab: {
    margin: theme.spacing(2)
  },
  danger: {
    background: '#cf1c24',
    margin: theme.spacing(2),
    '&:hover': {
      background: '#9e0e0e'
    }
  },
  buttonPaper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
}))

const Negocios = () => {
  const matches = useMediaQuery('(min-width:525px)')
  const { user } = useContext(UserContext)
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    fab: {
      margin: theme.spacing(2)
    },
    danger: {
      background: '#cf1c24',
      margin: theme.spacing(2),
      '&:hover': {
        background: '#9e0e0e'
      }
    },
    buttonPaper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }
  }))

  const classes = useStyles()
  const classes2 = useStyles2()

  const [openDialog, setOpenDialog] = useState(false)
  const [negocios, setNegocios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedNegocio, setSelectedNegocio] = useState(false)
  const [searchBusiness, setSearchBusiness] = useState('')
  const [statusNegocio, setStatusNegocio] = useState(false)
  const [unableNegocio, setUnableNegocio] = useState(true)

  const filteredBusiness = negocios.filter((negocio) => {
    if (
      negocio.bussinesName
        .toLowerCase()
        .includes(searchBusiness.toLowerCase()) ||
      negocio.bussinesAdress
        .toLowerCase()
        .includes(searchBusiness.toLowerCase()) ||
      negocio.email.toLowerCase().includes(searchBusiness.toLowerCase())
    ) {
      return negocio
    } else {
      return null
    }
  })

  useEffect(() => {
    async function getAllNegocios() {
      setIsLoading(true)
      const { success, response, error } = await getNegocios()
      if (success && response) {
        setNegocios(response.data)
        setIsLoading(false)
      } else {
        //console.log(error)
      }
    }
    if (!openDialog || !deleteDialog || !statusNegocio) {
      getAllNegocios()
    }
  }, [openDialog, deleteDialog, statusNegocio])

  const handleChange = (e) => {
    e.preventDefault()
    setSearchBusiness(e.target.value)
  }

  const handleClick = async (e, negocio) => {
    e.preventDefault()
    if (negocio.estatus === 1) {
      const { success, response, error } = await enableNegocio(
        selectedNegocio.email
      )
      if (response.error) {
        //console.log(error)
      } else {
        setStatusNegocio(true)
      }
      setStatusNegocio(false)
    } else {
      setDeleteDialog(true)
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {user.role === 'Admin' && (
          <Paper
            style={{
              display: 'flex',
              textAlign: 'center',
              marginBottom: '1.2rem',
              justifyContent: 'space-between'
            }}
            className={classes.buttonPaper}
          >
            <TextField
              placeholder="Buscar Negocio..."
              style={{ width: '' }}
              inputProps={{
                maxLength: 25
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className="MuiInputAdornment-root"
                  >
                    <SearchIcon fontSize="large" />
                  </InputAdornment>
                )
              }}
              value={searchBusiness}
              onChange={(e) => handleChange(e)}
            />
            <Button
              onClick={() => setOpenDialog(true)}
              color="primary"
              variant="contained"
              style={{ marginTop: matches ? '' : '15px' }}
            >
              Agregar Negocio
            </Button>
          </Paper>
        )}
        {filteredBusiness.length > 0 ? (
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      onClick={() =>
                        user.role === 'Admin'
                          ? setUnableNegocio(!unableNegocio)
                          : null
                      }
                      style={{
                        background: `${
                          unableNegocio ? 'rgb(0, 119, 114)' : '#f44336'
                        }`,
                        color: 'white',
                        borderRadius: '.3em',
                        cursor: 'pointer'
                      }}
                    >
                      Estado
                    </TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <Hidden xsDown>
                      <TableCell align="center">Correo</TableCell>
                    </Hidden>
                    <Hidden smDown>
                      <TableCell align="center">Dirección</TableCell>
                    </Hidden>
                    {user.role === 'Admin' && (
                      <TableCell align="center">Acciones</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBusiness.map((negocio, index) => (
                    <TableRow key={index} role="checkbox" tabIndex={-1}>
                      <>
                        {negocio.estatus === 0 && unableNegocio ? (
                          <>
                            <TableCell align="center">
                              <CheckCircleIcon
                                fontSize="large"
                                color="primary"
                              ></CheckCircleIcon>
                            </TableCell>
                            <TableCell align="center">
                              {negocio.bussinesName}
                            </TableCell>
                            <Hidden xsDown>
                              <TableCell align="center">
                                {negocio.email}
                              </TableCell>
                            </Hidden>
                            <Hidden smDown>
                              <TableCell align="center">
                                {negocio.bussinesAdress}
                              </TableCell>
                            </Hidden>
                            {user.role === 'Admin' && (
                              <TableCell align="center">
                                <Tooltip title="Editar" aria-label="Editar">
                                  <Fab
                                    color="secondary"
                                    className={classes.fab}
                                  >
                                    <RefreshIcon variant="outlined">
                                      Editar
                                    </RefreshIcon>
                                  </Fab>
                                </Tooltip>

                                <Tooltip
                                  title="Eliminar"
                                  aria-label="Eliminar"
                                  onMouseEnter={() =>
                                    setSelectedNegocio(negocio)
                                  }
                                >
                                  <Fab
                                    onClick={(e) => {
                                      handleClick(e, negocio)
                                    }}
                                    color="primary"
                                    className={classes.danger}
                                  >
                                    <DeleteIcon />
                                  </Fab>
                                </Tooltip>
                              </TableCell>
                            )}
                          </>
                        ) : (
                          <>
                            {negocio.estatus === 1 && !unableNegocio ? (
                              <>
                                <TableCell align="center">
                                  <HighlightOffRoundedIcon
                                    fontSize="large"
                                    color="error"
                                  ></HighlightOffRoundedIcon>
                                </TableCell>
                                <TableCell align="center">
                                  {negocio.bussinesName}
                                </TableCell>
                                <Hidden xsDown>
                                  <TableCell align="center">
                                    {negocio.email}
                                  </TableCell>
                                </Hidden>
                                <Hidden smDown>
                                  <TableCell align="center">
                                    {negocio.bussinesAdress}
                                  </TableCell>
                                </Hidden>
                                <TableCell align="center">
                                  <Button
                                    onClick={(e) => {
                                      handleClick(e, negocio)
                                    }}
                                    onMouseEnter={() =>
                                      setSelectedNegocio(negocio)
                                    }
                                    color="secondary"
                                    variant={`${
                                      negocio.estatus === 1
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
        ) : (
          <div style={{ textAlign: 'center' }}>
            {isLoading ? (
              <CircularProgress></CircularProgress>
            ) : (
              <h2>{`El negocio: ${searchBusiness} no está registrado.`}</h2>
            )}
          </div>
        )}
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
