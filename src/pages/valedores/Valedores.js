import React, { useState, useEffect } from 'react'
import {
  Grid,
  Paper,
  Button,
  Hidden,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddCredit from 'components/valedor/addCredit'
import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Fab from '@material-ui/core/Fab'
import SearchIcon from '@material-ui/icons/Search'
import TableRow from '@material-ui/core/TableRow'
import { getValedores, enableValedor } from 'requests/allValedores'
import RegisterValedor from 'components/valedor/register'
import numeral from 'numeral'
import HistoryIcon from '@material-ui/icons/History'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import DeleteValedor from 'components/valedor/delete'
import DeleteIcon from '@material-ui/icons/Delete'
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
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

const Valedores = () => {
  const classes = useStyles()
  const history = useHistory()

  const [openDialog, setOpenDialog] = useState(false)
  const [openAddCredits, setOpenAddCredits] = useState(false)
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
      valedor.lastName.toLowerCase().includes(searchValedor.toLowerCase()) ||
      valedor.email.toLowerCase().includes(searchValedor.toLowerCase())
    ) {
      return valedor
    } else {
      return []
    }
  })

  useEffect(() => {
    async function getAllValedores() {
      setIsLoading(true)
      const { success, response, error } = await getValedores()
      if (success && response) {
        setValedores(response.data)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }
    if (!openDialog || !deleteDialog || !statusValedor) {
      getAllValedores()
    }
  }, [openDialog, deleteDialog, statusValedor, openAddCredits])

  const handleChange = (e) => {
    e.preventDefault()
    setSearchValedor(e.target.value)
  }

  const handleClick = async (e, valedor) => {
    e.preventDefault()
    if (valedor.estatus === 1) {
      const { success, response, error } = await enableValedor(valedor.email)
      if (response.error) {
        //console.log(error)
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
          <TextField
            placeholder="Buscar Valedor..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            style={{ width: '33vw' }}
            inputProps={{
              maxLength: 25
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
            value={searchValedor}
            onChange={(e) => handleChange(e)}
          />
        </Paper>
        {filteredValedores.length > 0 ? (
          <Paper className={classes.paper}>
            <TableContainer>
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
                        borderRadius: '.3em',
                        cursor: 'pointer'
                      }}
                    >
                      Estado
                    </TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <Hidden smDown>
                      <TableCell align="center">Correo</TableCell>
                    </Hidden>
                    <TableCell align="center">Crédito</TableCell>
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
                              <CheckCircleIcon
                                color="primary"
                                fontSize="large"
                              ></CheckCircleIcon>
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
                            <TableCell
                              style={{
                                justifyContent: 'center'
                              }}
                              align="center"
                            >
                              <Tooltip
                                title="Agregar Crédito"
                                aria-label="agregar"
                                onMouseEnter={() => setSelectedValedor(valedor)}
                              >
                                <Fab
                                  onClick={() => setOpenAddCredits(true)}
                                  color="primary"
                                  className={classes.fab}
                                >
                                  <AttachMoneySharpIcon
                                    variant="outlined"
                                    fontSize="large"
                                  />
                                </Fab>
                              </Tooltip>

                              <Tooltip title="Historial" aria-label="historial">
                                <Fab
                                  onClick={() =>
                                    history.push({
                                      pathname: '/valedores/history',
                                      state: {
                                        valedor
                                      }
                                    })
                                  }
                                  color="secondary"
                                  className={classes.fab}
                                >
                                  <HistoryIcon fontSize="large" />
                                </Fab>
                              </Tooltip>

                              <Tooltip
                                title="Eliminar"
                                aria-label="eliminar"
                                onMouseEnter={() => setSelectedValedor(valedor)}
                              >
                                <Fab
                                  onClick={(e) => {
                                    handleClick(e, valedor)
                                  }}
                                  color="secondary"
                                  className={classes.danger}
                                >
                                  <DeleteIcon />
                                </Fab>
                              </Tooltip>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            {valedor.estatus === 1 && !unableValedor ? (
                              <>
                                <TableCell align="center">
                                  <HighlightOffRoundedIcon
                                    fontSize="large"
                                    color="error"
                                  ></HighlightOffRoundedIcon>
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
                            ) : (
                              <></>
                            )}
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
              <h2>{`El valedor: ${searchValedor} no está registrado.`}</h2>
            )}
          </div>
        )}
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

      <ResponsivePopUp
        open={openAddCredits}
        setOpen={setOpenAddCredits}
        title={'Agregar Crédito'}
        confirmText={'Confirm Text'}
      >
        <AddCredit email={selectedValedor.email}></AddCredit>
      </ResponsivePopUp>
    </Grid>
  )
}

export default Valedores
