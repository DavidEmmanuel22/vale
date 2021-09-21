import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import './registerValedor.css'
import Styles from './Styles'
import EmailIcon from '@material-ui/icons/Email'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { AlertContext } from '../popUp/responsivePopUp'
import { addPaymentValedor } from 'requests/allValedores'
import { ReceiptOutlined } from '@material-ui/icons'

const AddPayment = ({ valedor }) => {
    const creditsExpression = /^\d+$/

    const validationSchema = yup.object({
        amount: yup
            /*.string()
            .matches(creditsExpression, 'Solo nùmeros enteros positivos')
            .required('Credito es requerido')*/
            .number()
            .required('El pago a registrar es requerido')
            .positive('El pago a registrar debe ser mayor a 0'),
        transaction: yup.string()
    })

    const { alertText, alertColor, setAlertText, setAlertColor, handleClose } = React.useContext(AlertContext)
    const classes = Styles()

    const formik = useFormik({
        initialValues: {
            amount: 0,
            transaction: ''
        },
        onSubmit: async (valedorUser, { resetForm }) => {
            const { success, response, error } = await addPaymentValedor(
                valedor._id,
                valedorUser.transaction,
                valedorUser.amount
            )
            if (success && response) {
                if (!response.error) {
                    setAlertColor('success')
                    setAlertText('El pago fue agregado correctamente')
                    resetForm({ valedorUser: '' })
                } else {
                    setAlertColor('error')
                    setAlertText(response.error)
                    resetForm({ valedorUser: '' })
                }
                console.log(response)
                setTimeout(() => {
                    handleClose()
                }, 10000)
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
                            value={valedor.email}
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
                            id='amount'
                            placeholder='Valor del pago'
                            type='number'
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start' className='MuiInputAdornment-root'>
                                        <MonetizationOnIcon></MonetizationOnIcon>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            className={classes.widthnew}
                            id='transaction'
                            placeholder='ID de transaccion o identificador (si existe)'
                            type='text'
                            value={formik.values.transaction}
                            onChange={formik.handleChange}
                            error={formik.touched.transaction && Boolean(formik.errors.transaction)}
                            helperText={formik.touched.transaction && formik.errors.transaction}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start' className='MuiInputAdornment-root'>
                                        <ReceiptOutlined></ReceiptOutlined>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className='button-login'>
                            <Button className={`${classes.widthbutton} `} type='submit' color='primary'>
                                Registrar pago de {valedor.firstName}
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default AddPayment
