import React, { useState } from 'react'
import { forgotPassword } from 'requests/forgotPassword'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { TextField, Button, InputAdornment, Grid, Paper, Typography, Collapse } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import Logo from 'images/logo-appbar.png'
import Styles from './Styles'
import EmailIcon from '@material-ui/icons/Email'
import { Alert } from '@material-ui/lab'

const validationSchema = yup.object({
    email: yup.string().email('Correo Electronico Invalido').required('Correo Electronico es requerido')
})

const ForgotPassword = () => {
    const history = useHistory()
    const classes = Styles()
    const [alertText, setAlertText] = useState('')
    const [alertColor, setAlertColor] = useState('success')
    const [showAlert, setShowAlert] = useState(false)
    const [checked, setChecked] = useState(false)

    const handleCleanInput = () => {
        formik.values.email = ''
    }

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: async updatedPassword => {
            //console.log(updatedPassword.email)
            const { success, response, error } = await forgotPassword(updatedPassword.email)
            if (success && response) {
                if (response.error) {
                    setAlertColor('error')
                    setAlertText(response.error)
                    setChecked(false)
                } else {
                    setAlertColor('success')
                    setAlertText(response.data)
                    setShowAlert(true)
                    setTimeout(() => {
                        setChecked(true)
                        history.push('/')
                    }, 5000)
                }
            } else if (error) {
                setAlertColor('error')
                setAlertText(error.toString())
                setChecked(false)
            }
            setShowAlert(true)
        },
        validationSchema: validationSchema
    })

    return (
        <div>
            <Grid className={classes.GridContent} item md={12}>
                <Paper style={{ boxShadow: '0px 6px 21px 0px darkgrey' }} className={classes.PaperContent}>
                    <div>
                        <div style={{ top: '0' }} className={classes.FooterText}></div>
                    </div>
                    <form className={classes.FormContent} onSubmit={formik.handleSubmit}>
                        <a href='/'>
                            <img className={classes.ImageLogo} src={Logo} alt='Logo'></img>
                        </a>
                        <h2 className={classes.H2Password}>Recuperar Contraseña</h2>
                        <Typography className={classes.TypoEmail}>
                            Ingrese su correo, para cambiar su contraseña
                        </Typography>
                        <TextField
                            className={classes.InputEmail}
                            id='email'
                            placeholder='Correo'
                            type='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailIcon></EmailIcon>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Collapse in={showAlert} style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Alert severity={alertColor}>{alertText}</Alert>
                        </Collapse>
                        <Collapse in={checked}>
                            <a style={{ float: 'right' }} href='#' onClick={() => history.push('/')}>
                                Iniciar sesion
                            </a>
                        </Collapse>
                        <div>
                            <Button className={classes.ButtonPassword} type='submit' color='primary'>
                                Enviar para restablecer contraseña
                            </Button>
                            <a href='#' onClick={() => history.push('/')}>
                                Regresar
                            </a>
                        </div>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default ForgotPassword
