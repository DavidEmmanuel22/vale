import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import numeral from 'numeral'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, InputAdornment, Grid } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { AlertContext } from '../popUp/responsivePopUp'
import { addCredit, createValedor, getValedores } from 'requests/allValedores'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { addCreditSchema } from 'yupSchemas'

const Styles = makeStyles(() => ({
  widthnew: {
    display: 'flex',
    'flex-direction': 'column',
    margin: 'auto'
  },
  widthbutton: {
    width: '300px',
    borderRadius: 10,
    height: '40px',
    backgroundColor: '#007772',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#007772'
    }
  },
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center'
  }
}))

const RegisterCredit = (props) => {
  const classes = Styles()
  const [searchValedor, setSearchValedor] = useState('')
  const [valedores, setValedores] = useState([])
  const [credits, setCredits] = useState('')
  const [selectedValedor, setSelectedValedor] = useState(false)
  const [disableBtn, setDisabledBtn] = useState(false)

  const {
    alertText,
    alertColor,
    setAlertText,
    setAlertColor,
    handleClose
  } = useContext(AlertContext)

  useEffect(() => {
    async function getAllValedores() {
      const { success, response, error } = await getValedores()
      if (success && response) {
        setValedores(response.data)
      } else {
        //console.log(error)
      }
    }
    getAllValedores()
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    if (!/^[0-9]+$/i.test(e.target.value)) {
      setCredits('')
    } else {
      setCredits(e.target.value)
    }
  }

  const handleClick = async (e, email) => {
    e.preventDefault()
    const { success, response, error } = await addCredit(
      email,
      parseInt(credits)
    )
    if (success && response) {
      if (response.error) {
        setAlertColor('error')
        setAlertText(response.error)
      } else {
        setAlertColor('success')
        setAlertText('Se ha añadido el credito correctamente')
        setDisabledBtn(true)
        setTimeout(() => {
          handleClose()
        }, 6000)
      }
    }
  }

  return (
    <div className="register-vale">
      <form className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              onChange={(event, value) => setSelectedValedor(value)}
              className={classes.widthnew}
              id="combo-box-demo"
              options={valedores.filter((valedor) => valedor.estatus !== 1)}
              getOptionLabel={(valedor) =>
                valedor.firstName +
                ' ' +
                valedor.lastName +
                ': ' +
                numeral(valedor.credits).format('$0,0')
              }
              style={{ padding: '2em' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar Valedor..."
                  variant="outlined"
                />
              )}
            />
            <TextField
              disabled
              className={classes.widthnew}
              id="email"
              placeholder="Correo electronico"
              value={selectedValedor ? selectedValedor.email : ''}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.widthnew}
              id="credits"
              placeholder="Credito"
              type="number"
              value={credits}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10)
              }}
              onChange={(e) => handleChange(e)}
              //error={formik.touched.credits && Boolean(formik.errors.credits)}
              //helperText={formik.touched.credits && formik.errors.credits}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className="MuiInputAdornment-root"
                  >
                    <MonetizationOnIcon></MonetizationOnIcon>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="button-login">
              <Button
                disabled={disableBtn}
                className={`${classes.widthbutton} `}
                onClick={(e) => handleClick(e, selectedValedor.email)}
                color="primary"
              >
                Agregar Credito
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default RegisterCredit
