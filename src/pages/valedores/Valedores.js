import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button, Hidden, TextField, InputAdornment } from '@material-ui/core'
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
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
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
        color: theme.palette.text.secondary,
        height: `calc(100vh - 180px)`,
        overflowY: 'scroll'
    },
    buttonPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
}))

const Valedores = () => {
    const classes = useStyles()
    const history = useHistory()
    const matches = useMediaQuery('(min-width:525px)')
    const [openDialog, setOpenDialog] = useState(false)
    const [openAddCredits, setOpenAddCredits] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedValedor, setSelectedValedor] = useState({})
    const [valedores, setValedores] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchValedor, setSearchValedor] = useState('')
    const [statusValedor, setStatusValedor] = useState(false)
    const [unableValedor, setUnableValedor] = useState(true)

    const filteredValedores = valedores.filter(valedor => {
        if (
            valedor.firstName.toLowerCase().includes(searchValedor.toLowerCase()) ||
            valedor.lastName.toLowerCase().includes(searchValedor.toLowerCase()) ||
            valedor.email.toLowerCase().includes(searchValedor.toLowerCase())
        ) {
            return valedor
        } else {
            return null
        }
    })

    useEffect(() => {
        async function getAllValedores() {
            setIsLoading(true)
            const { success, response, error } = await getValedores()
            if (success && response) {
                if (response.error) {
                    console.error(response.error)
                } else {
                    setValedores(response.data)
                    setIsLoading(false)
                }
            } else {
                setIsLoading(false)
            }
        }
        if (!openDialog || !deleteDialog || !statusValedor) {
            getAllValedores()
        }
    }, [openDialog, deleteDialog, statusValedor, openAddCredits])

    const handleChange = e => {
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
        <Grid container spacing={3} style={{ height: '100%' }}>
            <Grid item xs={12} style={{ height: '100%' }}>
                <Paper
                    className={classes.buttonPaper}
                    style={{
                        display: 'flex',
                        textAlign: 'center',
                        marginBottom: '10px',
                        justifyContent: 'space-between'
                    }}
                >
                    <TextField
                        placeholder='Buscar Valedor...'
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        style={{ width: '' }}
                        inputProps={{
                            maxLength: 25
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start' className='MuiInputAdornment-root'>
                                    <SearchIcon fontSize='large' />
                                </InputAdornment>
                            )
                        }}
                        value={searchValedor}
                        onChange={e => handleChange(e)}
                    />
                    <Button
                        onClick={() => setOpenDialog(true)}
                        color='primary'
                        variant='contained'
                        style={{ marginTop: matches ? '' : '15px' }}
                    >
                        Agregar Valedor
                    </Button>
                </Paper>
                {isLoading && (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress></CircularProgress>
                    </div>
                )}
                {!isLoading && filteredValedores.length > 0 && (
                    <Paper className={classes.paper}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align='center'
                                            onClick={() => setUnableValedor(!unableValedor)}
                                            style={{
                                                background: `${unableValedor ? 'rgb(0, 119, 114)' : '#f44336'}`,
                                                color: 'white',
                                                borderRadius: '.3em',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Estado
                                        </TableCell>
                                        <TableCell align='center'>Nombre</TableCell>
                                        <Hidden smDown>
                                            <TableCell align='center'>Correo</TableCell>
                                        </Hidden>
                                        <Hidden smDown>
                                            <TableCell align='center'>Crédito</TableCell>
                                        </Hidden>
                                        <TableCell align='center'>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredValedores.map((valedor, index) => (
                                        <TableRow key={index} role='checkbox' tabIndex={-1}>
                                            <>
                                                {valedor.estatus === 0 && unableValedor ? (
                                                    <>
                                                        <TableCell align='center'>
                                                            <CheckCircleIcon
                                                                color='primary'
                                                                fontSize='large'
                                                            ></CheckCircleIcon>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            {valedor.firstName} {valedor.lastName}
                                                        </TableCell>
                                                        <Hidden smDown>
                                                            <TableCell align='center'>{valedor.email}</TableCell>
                                                        </Hidden>
                                                        <Hidden smDown>
                                                            <TableCell align='center'>
                                                                {numeral(valedor.credits).format('$0,0')}
                                                            </TableCell>
                                                        </Hidden>
                                                        <TableCell
                                                            style={{
                                                                justifyContent: 'center'
                                                            }}
                                                            align='center'
                                                        >
                                                            <Tooltip title='Agregar Crédito' aria-label='agregar'>
                                                                <Fab
                                                                    onClick={() => {
                                                                        setOpenAddCredits(true)
                                                                        setSelectedValedor(valedor)
                                                                    }}
                                                                    color='primary'
                                                                    className={classes.fab}
                                                                >
                                                                    <AttachMoneySharpIcon
                                                                        variant='outlined'
                                                                        fontSize='large'
                                                                    />
                                                                </Fab>
                                                            </Tooltip>

                                                            <Tooltip title='Historial' aria-label='historial'>
                                                                <Fab
                                                                    onClick={() =>
                                                                        history.push({
                                                                            pathname: '/valedores/history',
                                                                            state: {
                                                                                valedor
                                                                            }
                                                                        })
                                                                    }
                                                                    color='secondary'
                                                                    className={classes.fab}
                                                                >
                                                                    <HistoryIcon fontSize='large' />
                                                                </Fab>
                                                            </Tooltip>

                                                            <Tooltip
                                                                title='Eliminar'
                                                                aria-label='eliminar'
                                                                onMouseEnter={() => setSelectedValedor(valedor)}
                                                            >
                                                                <Fab
                                                                    onClick={e => {
                                                                        handleClick(e, valedor)
                                                                    }}
                                                                    color='secondary'
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
                                                                <TableCell align='center'>
                                                                    <HighlightOffRoundedIcon
                                                                        fontSize='large'
                                                                        color='error'
                                                                    ></HighlightOffRoundedIcon>
                                                                </TableCell>
                                                                <TableCell align='center'>
                                                                    {valedor.firstName} {valedor.lastName}
                                                                </TableCell>
                                                                <Hidden smDown>
                                                                    <TableCell align='center'>
                                                                        {valedor.email}
                                                                    </TableCell>
                                                                </Hidden>
                                                                <TableCell align='center'>
                                                                    {numeral(valedor.credits).format('$0,0')}
                                                                </TableCell>
                                                                <TableCell align='center'>
                                                                    <Button
                                                                        onClick={e => {
                                                                            handleClick(e, valedor)
                                                                        }}
                                                                        onMouseEnter={() => setSelectedValedor(valedor)}
                                                                        color='secondary'
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
                )}
                {valedores.length === 0 && !isLoading && (
                    <Alert severity='info'>¡Ups! Parece que aun no hay negocios registrados</Alert>
                )}
                {valedores.length !== 0 && filteredValedores.length === 0 && !isLoading && (
                    <Alert severity='warning'>
                        !Ups! Parece que no hay resultados disponibles para los filtros aplicados.
                    </Alert>
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
