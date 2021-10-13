import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import './registerNegocio.css'
import Styles from './Styles'
import EmailIcon from '@material-ui/icons/Email'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { AlertContext } from '../popUp/responsivePopUp'
import { addCredit } from 'requests/allValedores'
import { addPaymentBusiness } from 'requests/allNegocios'
import { FormatColorText } from '@material-ui/icons'

const PayBusiness = ({ email = '', business }) => {
    const creditsExpression = /^\d+$/

    const validationSchema = yup.object({
        credits: yup
            .string()
            .matches(creditsExpression, 'Solo nùmeros enteros positivos')
            .required('Credito es requerido')
    })

    const { alertText, alertColor, setAlertText, setAlertColor, handleClose } = React.useContext(AlertContext)
    const classes = Styles()

    const formik = useFormik({
        initialValues: {
            credits: 0,
            transaction: ''
        },
        onSubmit: async (payment, { resetForm }) => {
            const { success, response, error } = await addPaymentBusiness(
                business._id,
                payment.transaction,
                payment.credits
            )
            if (success && response) {
                if (response.error) {
                    setAlertColor('error')
                    setAlertText(response.error)
                } else {
                    setAlertColor('success')
                    setAlertText('El pago fue registrado correctamente')
                    resetForm({ payment: '' })
                    setTimeout(() => {
                        handleClose()
                    }, 2000)
                }
            }
        },
        validationSchema: validationSchema
    })

    return (
        <div className='register-valedor'>
            <form className={classes.root} onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            className={classes.widthnew}
                            id='email'
                            placeholder='Correo'
                            type='email'
                            value={email}
                            disabled
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <EmailIcon></EmailIcon>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            className={classes.widthnew}
                            id='credits'
                            placeholder='Valor del pago'
                            type='number'
                            value={formik.values.credits}
                            onChange={formik.handleChange}
                            error={formik.touched.credits && Boolean(formik.errors.credits)}
                            helperText={formik.touched.credits && formik.errors.credits}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start' className='MuiInputAdornment-root'>
                                        <MonetizationOnIcon></MonetizationOnIcon>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.widthnew}
                            id='transaction'
                            placeholder='ID de transaccion (si existe)'
                            type='text'
                            value={formik.values.transaction}
                            onChange={formik.handleChange}
                            error={formik.touched.transaction && Boolean(formik.errors.transaction)}
                            helperText={formik.touched.transaction && formik.errors.transaction}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start' className='MuiInputAdornment-root'>
                                        <FormatColorText></FormatColorText>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className='button-login'>
                            <Button variant='contained' type='submit' color='primary'>
                                Registrar pago de {business.bussinesName}
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default PayBusiness
