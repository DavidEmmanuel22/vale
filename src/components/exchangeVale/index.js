import React, { useState, useEffect, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Button, Collapse, InputAdornment, Typography } from '@material-ui/core'
import QrReader from 'react-qr-reader'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { validateVale } from '../../yupSchemas/valeSchemas'
import { useFormik } from 'formik'
import { AlertContext } from '../popUp/responsivePopUp'
import { chargeVale } from 'requests/allVales'
import FontDownloadIcon from '@material-ui/icons/FontDownload'

const ExchangeVale = () => {
    const matches = useMediaQuery('(min-width:600px)')

    const small = useMediaQuery('(max-width:599px)')
    const medium = useMediaQuery('(min-width:600px) and (max-width:999px)')
    const large = useMediaQuery('(min-width:1000px)')

    const useStyles = makeStyles(theme => ({
        root: {},
        paper: {
            padding: matches ? theme.spacing(2) : theme.spacing(1),
            textAlign: 'center',
            borderRadius: '15px',
            color: theme.palette.text.secondary
        },
        TextField: {
            marginTop: '18px'
        },
        btnScan: {
            float: 'right'
        },
        instructions: {
            textAlign: 'center',
            color: 'rgb(32, 26, 26)'
        },
        qr: {
            width: '400px'
        },
        btnQrBack: {
            marginTop: '15px'
        },
        btnSubmit: {
            marginTop: '10px'
        }
    }))

    const { alertText, alertColor, setAlertText, setAlertColor } = useContext(AlertContext)
    const classes = useStyles()
    const [showScan, setShowScan] = useState(false)

    const initialValues = {
        folio: '',
        amount: 0,
        concept: ''
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (data, onS) => {
            onS.resetForm()
            console.log('submit')
            chargeToVale(data.folio, data.amount, data.concept)
        },
        onReset: (data, onS) => {
            onS.setValues(initialValues)
        },
        validationSchema: validateVale
    })

    const chargeToVale = async (folio, amount, concept) => {
        const { success, error, response } = await chargeVale(folio, amount, concept)
        if (success && response) {
            if (response.error) {
                setAlertText(response.error)
                setAlertColor('error')
            } else {
                setAlertText('El monto ha sido cargado al vale correctamente')
                setAlertColor('success')
            }
        } else {
            setAlertColor('error')
            setAlertText('No ha sido posible conectarse al servidor')
        }
    }

    const handleScan = scanData => {
        if (scanData) {
            const objData = JSON.parse(scanData)
            const folioId = {
                target: {
                    id: 'folio',
                    value: objData.id
                }
            }
            const folioCredit = {
                target: {
                    id: 'amount',
                    value: objData.credits
                }
            }
            formik.handleChange(folioId)
            formik.handleChange(folioCredit)
            setShowScan(false)
        }
    }

    const handleErrorScan = data => {
        setAlertColor('error')
        setAlertText('Ha habido un problema al escanear')
        console.error(data)
    }

    return (
        <Grid container className={classes.root}>
            {showScan ? (
                <Grid container>
                    <Grid item xs={12}>
                        <QrReader
                            delay={500}
                            onError={handleErrorScan}
                            onScan={handleScan}
                            className={classes.qr}
                        ></QrReader>
                        <Button
                            color='secondary'
                            onClick={() => setShowScan(false)}
                            className={classes.btnQrBack}
                            variant='contained'
                        >
                            Regresar
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Grid item xs={12}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <label className={classes.instructions}>
                                    Ingresa el folio del vale, o presiona el boton para escanear QR
                                </label>
                                <div
                                    style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}
                                >
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <MonetizationOnIcon></MonetizationOnIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                        className={classes.TextField}
                                        id='folio'
                                        placeholder='Folio del vale'
                                        fullWidth
                                        label='Folio'
                                        type='text'
                                        value={formik.values.folio}
                                        onChange={formik.handleChange}
                                        error={formik.touched.folio && Boolean(formik.errors.folio)}
                                        helperText={formik.touched.folio && formik.errors.folio}
                                    />
                                    <Button
                                        color='secondary'
                                        onClick={() => setShowScan(true)}
                                        className={classes.btnScan}
                                    >
                                        Escanear Codigo QR
                                    </Button>
                                </div>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <MonetizationOnIcon></MonetizationOnIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    className={classes.TextField}
                                    id='amount'
                                    placeholder='Cantidad a cobrar'
                                    fullWidth
                                    label='Cantidad'
                                    type='number'
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                                    helperText={formik.touched.amount && formik.errors.amount}
                                />
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <FontDownloadIcon></FontDownloadIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    className={classes.TextField}
                                    id='concept'
                                    placeholder='Una prenda, telefono, por ejemplo...'
                                    fullWidth
                                    label='Concepto de venta'
                                    type='text'
                                    value={formik.values.concept}
                                    onChange={formik.handleChange}
                                    error={formik.touched.concept && Boolean(formik.errors.concept)}
                                    helperText={formik.touched.concept && formik.errors.concept}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button color='primary' type='submit' className={classes.btnSubmit} variant='contained'>
                                    Canjear Vale
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            )}
        </Grid>
    )
}

export default ExchangeVale
