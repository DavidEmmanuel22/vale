import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Button, Collapse, InputAdornment, Typography } from '@material-ui/core'
import QrReader from 'react-qr-reader'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

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
    }
  }))
  const classes = useStyles()

  const [qrData, setQrData] = useState('')
  const [showScan, setShowScan] = useState(false)

  const handleScan = scanData => {
    if (scanData) {
      setQrData(scanData)
      setShowScan(false)
    }
  }

  return (
    <Grid container className={classes.root}>
      {showScan ? (
        <Grid container>
          <Grid item xs={12}>
            <QrReader delay={500} onError={() => {}} onScan={handleScan} className={classes.qr}></QrReader>
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
          <Grid container>
            <Grid item xs={12}>
              <label className={classes.instructions}>
                Ingresa el folio del vale, o presiona el boton para escanear QR
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MonetizationOnIcon></MonetizationOnIcon>
                      </InputAdornment>
                    )
                  }}
                  value={qrData}
                  onChange={e => setQrData(e.target.value)}
                  id='bussinesName'
                  placeholder='Folio del vale'
                  fullWidth
                  type='text'
                  className={classes.TextField}
                />
                <Button color='secondary' onClick={() => setShowScan(true)} className={classes.btnScan}>
                  Escanear Codigo QR
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button disabled color='primary' variant='contained'>
                Verificar Vale
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default ExchangeVale
