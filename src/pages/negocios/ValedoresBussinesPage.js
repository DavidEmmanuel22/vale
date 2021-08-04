import React, { useState, useEffect, useContext } from 'react'
import { Grid, Paper, Button, Hidden, TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { getNegocios, enableNegocio } from 'requests/allNegocios'
import RoomIcon from '@material-ui/icons/Room'
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
import useFilter from 'hooks/useFilter'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    fab: {
        margin: theme.spacing(1)
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
        color: theme.palette.text.secondary,
        width: 'calc(100% - 10px)'
    },
    buttonPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
}))

const ValedoresBussines = () => {
    const matches = useMediaQuery('(min-width:525px)')
    const { user } = useContext(UserContext)

    const classes = useStyles()

    const [openDialog, setOpenDialog] = useState(false)
    const [negocios, setNegocios] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedNegocio, setSelectedNegocio] = useState(false)
    const [searchBusiness, setSearchBusiness] = useState('')
    const [statusNegocio, setStatusNegocio] = useState(false)
    const [unableNegocio, setUnableNegocio] = useState(true)

    const businessSearchProperties = ['email', 'bussinesName', 'direction']
    const [search, setSearch] = useState('')
    const [filteredItems, setTotalItems, setToSearch] = useFilter(negocios, businessSearchProperties, search)

    const filteredBusiness = negocios.filter(negocio => {
        if (
            negocio.bussinesName.toLowerCase().includes(searchBusiness.toLowerCase()) ||
            negocio.bussinesAdress.direction.toLowerCase().includes(searchBusiness.toLowerCase()) ||
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
                setTotalItems(
                    response.data.map(business => {
                        return {
                            ...business,
                            direction: business.bussinesAdress.direction
                        }
                    })
                )
                setIsLoading(false)
            } else {
                //console.log(error)
            }
        }
        if (!openDialog || !deleteDialog || !statusNegocio) {
            getAllNegocios()
        }
    }, [openDialog, deleteDialog, statusNegocio])

    const handleChange = e => {
        e.preventDefault()
        setSearchBusiness(e.target.value)
    }

    const handleClick = async (e, negocio) => {
        e.preventDefault()
        if (negocio.estatus === 1) {
            const { success, response, error } = await enableNegocio(selectedNegocio.email)
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

    const handleSearchChange = e => {
        setSearch(e.target.value)
        setToSearch(e.target.value)
    }

    return (
        <Grid container spacing={3} style={{ height: '100%' }}>
            <Grid item xs={12} style={{ height: '100%' }}>
                <Paper
                    className={classes.paper}
                    style={{ marginBottom: '10px', height: '65px', width: 'calc(100% - 10px)' }}
                >
                    <TextField
                        style={{ float: 'left' }}
                        value={search}
                        onChange={handleSearchChange}
                        placeholder={`Busca un negocio`}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon></SearchIcon>
                                </InputAdornment>
                            )
                        }}
                    ></TextField>
                </Paper>
                {isLoading && <CircularProgress></CircularProgress>}
                {!isLoading && negocios.length <= 0 && (
                    <Alert severity='info'>!UPS! Parece que aun no hay negocios registrados.</Alert>
                )}
                {filteredItems.length > 0 ? (
                    <Paper className={classes.paper} style={{ height: 'calc(100vh - 180px)', overflowY: 'scroll' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>Nombre</TableCell>
                                        <Hidden xsDown>
                                            <TableCell align='center'>Correo</TableCell>
                                        </Hidden>
                                        <Hidden smDown>
                                            <TableCell align='center'>Dirección</TableCell>
                                        </Hidden>
                                        <TableCell align='center'>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredItems.map((negocio, index) => (
                                        <TableRow key={index} role='checkbox' tabIndex={-1}>
                                            <>
                                                {negocio.estatus === 0 && (
                                                    <>
                                                        <TableCell align='center'>{negocio.bussinesName}</TableCell>
                                                        <Hidden xsDown>
                                                            <TableCell align='center'>{negocio.email}</TableCell>
                                                        </Hidden>
                                                        <Hidden smDown>
                                                            <TableCell align='center' style={{ width: '12em' }}>
                                                                {negocio.bussinesAdress.direction}
                                                            </TableCell>
                                                        </Hidden>
                                                        <TableCell align='center'>
                                                            <Tooltip
                                                                title='Dirección'
                                                                aria-label='Dirección'
                                                                onMouseEnter={() => setSelectedNegocio(negocio)}
                                                            >
                                                                <Fab
                                                                    color='primary'
                                                                    className={classes.success}
                                                                    onClick={() =>
                                                                        window.open(
                                                                            `${selectedNegocio.urlMap}`,
                                                                            '_blank'
                                                                        )
                                                                    }
                                                                >
                                                                    <RoomIcon />
                                                                </Fab>
                                                            </Tooltip>
                                                        </TableCell>
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
                    negocios.length > 0 && (
                        <Alert severity='warning'>
                            !Ups! Parece que no hay resultados disponibles para los filtros aplicados.
                        </Alert>
                    )
                )}
            </Grid>
            <ResponsivePopUp open={openDialog} setOpen={setOpenDialog} title={'Registra un negocio'}>
                <RegisterNegocio></RegisterNegocio>
            </ResponsivePopUp>
            <ResponsivePopUp open={deleteDialog} setOpen={setDeleteDialog} title={'Elimina un negocio'}>
                <DeleteNegocio negocio={selectedNegocio}></DeleteNegocio>
            </ResponsivePopUp>
        </Grid>
    )
}

export default ValedoresBussines
