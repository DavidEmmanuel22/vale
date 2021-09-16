import React, { useContext, useState, useEffect } from 'react'
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
import { Link, useHistory } from 'react-router-dom'
import { forgotPassword } from 'requests/forgotPassword'
import { updateUserSelfSchema } from 'yupSchemas'
import { useFormik } from 'formik'
import { AccountCircle } from '@material-ui/icons'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useAlert from 'hooks/useAlert'
import UserAvatar from 'components/avatar'
import AlertPopUp from 'components/Alert/AlertPopUp'

export const DashboardPerfil = () => {
    const { user, login, logout } = useContext(UserContext)
    const [onEdit, setOnEdit] = useState(false)
    const [alert, dispatchAlert] = useAlert()
    const avatarRef = React.useRef()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')

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
            setOnEdit(false)
            const theUser = {
                firstName: userUpdated.firstName,
                lastName: userUpdated.lastName,
                urlImage: avatarRef.current.urlImage()
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
                console.log(theUser)
                login(response.data.token)
            }
            setTimeout(() => {
                dispatchAlert({
                    type: 'show',
                    payload: {
                        show: false
                    }
                })
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
            }, 10000)
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
                        <BackgroundPaper></BackgroundPaper>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => {
                                setModalTitle('valedor')
                                setShowModal(true)
                            }}
                            startIcon={<MonetizationOnIcon></MonetizationOnIcon>}
                            style={{
                                width: '100%',
                                marginTop: '10px',
                                marginBottom: '10px',
                                borderRadius: '15px',
                                height: '21%'
                            }}
                        >
                            Registrar Valedor
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setModalTitle('negocio')
                                setShowModal(true)
                            }}
                            startIcon={<BusinessCenterIcon></BusinessCenterIcon>}
                            style={{ width: '100%', borderRadius: '15px', height: '21%' }}
                        >
                            Registrar Negocio
                        </Button>
                    </Hidden>
                    <Hidden mdUp>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => {
                                setModalTitle('valedor')
                                setShowModal(true)
                            }}
                            startIcon={<MonetizationOnIcon></MonetizationOnIcon>}
                            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                        >
                            Registrar Valedor
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setModalTitle('negocio')
                                setShowModal(true)
                            }}
                            startIcon={<BusinessCenterIcon></BusinessCenterIcon>}
                            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                        >
                            Registrar Negocio
                        </Button>
                    </Hidden>
                </Grid>
            </Grid>
            <AlertPopUp
                open={alert.show}
                description={alert.content}
                setOpen={() => {
                    dispatchAlert({
                        type: 'show',
                        payload: {
                            show: false
                        }
                    })
                }}
                type={alert.severity}
            ></AlertPopUp>
            {modalTitle === 'valedor' ? (
                <ResponsivePopUp open={showModal} setOpen={setShowModal} title='Registra un valedor'>
                    <RegisterValedor></RegisterValedor>
                </ResponsivePopUp>
            ) : (
                <ResponsivePopUp open={showModal} setOpen={setShowModal} title={'Registra un negocio'}>
                    <RegisterNegocio></RegisterNegocio>
                </ResponsivePopUp>
            )}
        </div>
    )
}
