import React, { useContext, useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button, Collapse, InputAdornment, Typography } from '@material-ui/core'
import { UserContext } from '../../context/userContext'
import BackgroundPaper from 'components/BackgroundPaper'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import RegisterNegocio from 'components/negocio/register'
import RegisterValedor from 'components/valedor/register'
import Hidden from '@material-ui/core/Hidden'
import { updateUser, uploadImage } from 'requests/allValedores'
import { Alert } from '@material-ui/lab'
import { Link, useHistory } from 'react-router-dom'
import { forgotPassword } from 'requests/forgotPassword'
import { updateUserSelfSchema } from 'yupSchemas'
import { useFormik } from 'formik'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import Fab from '@material-ui/core/Fab'
import * as yup from 'yup'
import { AccountCircle } from '@material-ui/icons'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BadgeAvatars from './Avatar'
import { AddVale } from 'components/valedor/addVale'
import ShowCredit from 'components/showCredit'
import useAlert from 'hooks/useAlert'
import UserAvatar from 'components/avatar'

const NameExpression = /^\S/

const ValedorDashboardProfile = () => {
    const { user, login, logout } = useContext(UserContext)
    const [onEdit, setOnEdit] = useState(false)
    const [showModalVale, setShowModalVale] = useState(false)
    const [alert, dispatchAlert] = useAlert()
    const avatarRef = React.useRef()
    const history = useHistory()

    const matches = useMediaQuery('(min-width:600px)')

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: matches ? theme.spacing(3) : theme.spacing(1),
            textAlign: 'center',
            borderRadius: '15px',
            color: theme.palette.text.secondary
        },
        input: {
            display: 'none'
        }
    }))

    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        urlImage: user.urlImage
    }

    const classes = useStyles()

    const formik = useFormik({
        initialValues,
        onSubmit: userUpdated => {
            console.log('submit')
            setOnEdit(false)
            const theUser = {
                firstName: userUpdated.firstName,
                lastName: userUpdated.lastName
            }
            handleSubmit(theUser)
        },
        onReset: (userUpdated, onS) => {
            onS.setValues(initialValues)
            avatarRef.current.rollbackImage()
            setOnEdit(false)
        },
        validationSchema: updateUserSelfSchema
    })

    const handleSubmit = async theUser => {
        const { success, response, error } = await updateUser(user._id, theUser)
        if (success && response) {
            if (response.error || response.data.error) {
                dispatchAlert({
                    type: 'error',
                    payload: {
                        content: response.error || response.data.error,
                        show: true
                    }
                })
            } else {
                dispatchAlert({
                    type: 'success',
                    payload: {
                        content: response.data.message,
                        show: true
                    }
                })
            }
            setTimeout(() => {
                /*dispatchAlert({
                    type: 'show',
                    payload: {
                        show: false
                    }
                })*/
                login(response.data.token)
            }, 10000)
        }
    }

    const handleChangePassword = async () => {
        const { success, response, error } = await forgotPassword(user.email)
        if (success && response) {
            if (response.error) {
                dispatchAlert({
                    type: 'error',
                    payload: {
                        content: response.error,
                        show: true
                    }
                })
            } else {
                dispatchAlert({
                    type: 'success',
                    payload: {
                        content: `Se te ha enviado un correo a ${user.email}, sigue las instrucciones para cambiar contraseña`,
                        show: true
                    }
                })
            }
            setTimeout(() => {
                logout()
                history.push('/')
            }, 3000)
        }
    }

    const errorImageHandler = error => {
        dispatchAlert({
            type: 'error',
            payload: {
                content: error,
                show: true
            }
        })

        setTimeout(() => {
            dispatchAlert({
                type: 'show',
                payload: {
                    show: false
                }
            })
        }, 5000)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <Paper className={classes.paper}>
                        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className={classes.root}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant='h5' component='h4' gutterBottom>
                                        Perfil de Usuario
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <UserAvatar
                                        errorImageHandler={errorImageHandler}
                                        onEdit={onEdit}
                                        ref={avatarRef}
                                    ></UserAvatar>
                                </Grid>
                                <Grid item xs={12} sm={6} md={5}>
                                    <TextField
                                        id='firstName'
                                        placeholder='Nombre'
                                        fullWidth
                                        label='Nombre'
                                        disabled={!onEdit}
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        type='text'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <AccountCircle />
                                                </InputAdornment>
                                            )
                                        }}
                                        inputProps={{
                                            maxLength: 60
                                        }}
                                    />
                                    <TextField
                                        id='lastName'
                                        placeholder='Apellido'
                                        fullWidth
                                        label='Apellido'
                                        style={{ marginTop: '15px' }}
                                        disabled={!onEdit}
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        type='text'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <AccountCircle />
                                                </InputAdornment>
                                            )
                                        }}
                                        inputProps={{
                                            maxLength: 60
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={5}>
                                    <TextField
                                        style={{ width: '100%' }}
                                        id='standard-basic'
                                        label='Email'
                                        value={user.email}
                                        disabled
                                    />
                                    <TextField
                                        style={{ width: '100%', marginTop: '15px' }}
                                        id='standard-basic'
                                        label='Rol'
                                        value={user.role}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Collapse in={alert.show}>
                                        <Alert style={{ marginTop: '10px' }} severity={alert.severity}>
                                            {alert.content}
                                        </Alert>
                                    </Collapse>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row-reverse',
                                        flexWrap: 'wrap-reverse'
                                    }}
                                >
                                    {onEdit && (
                                        <>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                style={{ marginLeft: '10px' }}
                                                type='submit'
                                            >
                                                Guardar
                                            </Button>
                                            <Button variant='contained' color='secondary' style={{}} type='reset'>
                                                Cancelar
                                            </Button>
                                        </>
                                    )}
                                    {!onEdit && (
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => setOnEdit(true)}
                                        >
                                            Editar
                                        </Button>
                                    )}
                                    <a href='#' onClick={handleChangePassword} style={{ marginRight: 'auto' }}>
                                        Cambiar contraseña
                                    </a>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Hidden smDown>
                        <ShowCredit height='80%'></ShowCredit>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => setShowModalVale(true)}
                            startIcon={<MonetizationOnIcon></MonetizationOnIcon>}
                            style={{
                                width: '100%',
                                borderRadius: '15px',
                                height: '20%',
                                fontSize: '18px'
                            }}
                        >
                            Crear Vale
                        </Button>
                    </Hidden>
                </Grid>
            </Grid>
            <ResponsivePopUp open={showModalVale} setOpen={setShowModalVale} title={'Crea un nuevo vale'}>
                <AddVale></AddVale>
            </ResponsivePopUp>
        </div>
    )
}

export default ValedorDashboardProfile
