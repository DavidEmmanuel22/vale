import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button, Hidden, TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddCredit from 'components/valedor/addCredit'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { getValedores, enableValedor } from 'requests/allValedores'
import RegisterValedor from 'components/valedor/register'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import DeleteValedor from 'components/valedor/delete'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Alert } from '@material-ui/lab'
import { ValedorTable } from 'components/Tables/ValedorTable'
import AddPayment from 'components/valedor/addPayment'

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
    const [paymentDialog, setPaymentDialog] = useState(false)
    const [selectedValedor, setSelectedValedor] = useState({})
    const [valedores, setValedores] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchValedor, setSearchValedor] = useState('')

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

    useEffect(() => {
        if (!openDialog && !deleteDialog && !openAddCredits && !paymentDialog) {
            getAllValedores()
        }
    }, [openDialog, deleteDialog, openAddCredits, paymentDialog])

    const handleChange = e => {
        e.preventDefault()
        setSearchValedor(e.target.value)
    }

    const habilitateValedor = async valedor => {
        const { success, response, error } = await enableValedor(valedor.email)
        if (success && response) {
            if (!response.error) {
                getAllValedores()
            }
        }
    }

    function handleTableEvent(action, payload) {
        switch (action) {
            case 'setUser':
                setSelectedValedor(payload.user)
                break
            case 'history':
                history.push({
                    pathname: '/valedores/history',
                    state: {
                        valedor: selectedValedor
                    }
                })
                break
            case 'credit':
                console.log(action)
                setOpenAddCredits(true)
                break
            case 'delete':
                console.log(action)
                setDeleteDialog(true)
                break
            case 'habilitate':
                console.log(action)
                habilitateValedor(selectedValedor)
                break
            case 'register':
                setPaymentDialog(true)
                break
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
                        <ValedorTable onEvent={handleTableEvent} vales={filteredValedores}></ValedorTable>
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
            <ResponsivePopUp
                open={paymentDialog}
                setOpen={setPaymentDialog}
                title='Agregar Pago'
                confirmText='Confirm Text'
            >
                <AddPayment email={selectedValedor.email}></AddPayment>
            </ResponsivePopUp>
        </Grid>
    )
}

export default Valedores
