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
import { getNegocios, enableNegocio } from 'requests/allNegocios'
import { updateUser } from 'requests/allValedores'
import RegisterNegocio from 'components/negocio/register'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import DeleteNegocio from 'components/negocio/delete'
import RefreshIcon from '@material-ui/icons/Refresh'
import { Alert } from '@material-ui/lab'
import InputBase from '@material-ui/core/InputBase'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'

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
    background: 'red',
    margin: theme.spacing(2),
    '&:hover': {
      background: '#9e0e0e'
    }
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
        .includes(searchBusiness.toLowerCase())
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
        console.log(error)
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
            Agregar Negocio
          </Button>

          <InputBase
            placeholder="Buscar Negocio..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchBusiness}
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
                    onClick={() => setUnableNegocio(!unableNegocio)}
                    style={{
                      background: `${
                        unableNegocio ? 'rgb(0, 119, 114)' : '#f44336'
                      }`,
                      color: 'white',
                      borderRadius: '.3em'
                    }}
                  >
                    Estatus
                  </TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <Hidden xsDown>
                    <TableCell align="center">Correo</TableCell>
                  </Hidden>
                  <Hidden smDown>
                    <TableCell align="center">Dirección</TableCell>
                  </Hidden>
                  <TableCell align="center">Acciones</TableCell>
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
                          <TableCell align="center">
                            <Tooltip title="Editar" aria-label="Editar">
                              <Fab color="secondary" className={classes.fab}>
                                <RefreshIcon variant="outlined">
                                  Editar
                                </RefreshIcon>
                              </Fab>
                            </Tooltip>

                            <Tooltip
                              title="Eliminar"
                              aria-label="Eliminar"
                              onMouseEnter={() => setSelectedNegocio(negocio)}
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
