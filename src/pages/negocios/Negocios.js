import React, { useState, useEffect, useContext } from 'react'
import { Grid, Paper, Button, Hidden, TextField, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import { getNegocios, enableNegocio } from 'requests/allNegocios'
import RegisterNegocio from 'components/negocio/register'
import CircularProgress from '@material-ui/core/CircularProgress'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import DeleteNegocio from 'components/negocio/delete'
import { Alert } from '@material-ui/lab'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { UserContext } from 'context/userContext'
import BusinessTable from 'components/negocio/BusinessTable'
import PayBusiness from 'components/negocio/PayBusiness'
import { useHistory } from 'react-router-dom'

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
        height: `calc(100vh - 180px)`,
        overflowY: 'scroll'
    },
    buttonPaper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        minHeight: '65px'
    }
}))

const Negocios = () => {
    const matches = useMediaQuery('(min-width:525px)')
    const { user } = useContext(UserContext)
    const history = useHistory()

    const classes = useStyles()

    const [openDialog, setOpenDialog] = useState(false)
    const [negocios, setNegocios] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [payDialog, setPayDialog] = useState(false)
    const [selectedNegocio, setSelectedNegocio] = useState(false)
    const [searchBusiness, setSearchBusiness] = useState('')

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

    async function getAllNegocios() {
        setIsLoading(true)
        const { success, response, error } = await getNegocios()
        if (success && response) {
            if (response.error) {
                console.error(response.error)
            } else {
                setNegocios(response.data)
                setIsLoading(false)
            }
        } else {
            //console.log(error)
        }
    }

    useEffect(() => {
        if (!openDialog && !deleteDialog) {
            getAllNegocios()
        }
    }, [openDialog, deleteDialog])

    const handleChange = e => {
        e.preventDefault()
        setSearchBusiness(e.target.value)
    }

    const handleActivate = async () => {
        const { success, response, error } = await enableNegocio(selectedNegocio.email)
        if (success && response) {
            if (!response.error) {
                getAllNegocios()
            }
        }
    }

    function handleEventButton(action, payload) {
        switch (action) {
            case 'setUser':
                setSelectedNegocio(payload.user)
                break
            case 'history':
                history.push(`/dashboard/negocio/${selectedNegocio._id}`, {
                    business: selectedNegocio
                })
                break
            case 'delete':
                setDeleteDialog(true)
                break
            case 'location':
                window.open(`${selectedNegocio.urlMap}`, '_blank')
                break
            case 'payment':
                setPayDialog(true)
                break
            case 'activate':
                handleActivate(true)
                break
        }
    }

    return (
        <Grid container spacing={3} style={{ height: '100%' }}>
            <Grid item xs={12} style={{ height: '100%' }}>
                <Paper
                    style={{
                        display: 'flex',
                        textAlign: 'center',
                        marginBottom: '10px',
                        justifyContent: 'space-between'
                    }}
                    className={classes.buttonPaper}
                >
                    <TextField
                        placeholder='Buscar Negocio...'
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
                                <InputAdornment position='start' className='MuiInputAdornment-root'>
                                    <SearchIcon fontSize='large' />
                                </InputAdornment>
                            )
                        }}
                        value={searchBusiness}
                        onChange={e => handleChange(e)}
                    />
                    <Button
                        onClick={() => setOpenDialog(true)}
                        color='primary'
                        variant='contained'
                        style={{ marginTop: matches ? '' : '15px' }}
                    >
                        Agregar Negocios
                    </Button>
                </Paper>
                {isLoading && <CircularProgress></CircularProgress>}
                {!isLoading && negocios.length <= 0 && (
                    <Alert severity='info'>!UPS! Parece que aun no hay negocios registrados.</Alert>
                )}
                {filteredBusiness.length > 0 ? (
                    <Paper className={classes.paper}>
                        <BusinessTable businessList={filteredBusiness} onEvent={handleEventButton}></BusinessTable>
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
            <ResponsivePopUp open={payDialog} setOpen={setPayDialog} title='Registrar Pago A Negocio'>
                <PayBusiness email={selectedNegocio.email}></PayBusiness>
            </ResponsivePopUp>
        </Grid>
    )
}

export default Negocios
