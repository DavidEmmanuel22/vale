import React, { useState, useEffect, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Hidden } from '@material-ui/core'
import { getValedores, enableValedor } from 'requests/allValedores'
import AddIcon from '@material-ui/icons/Add'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import RegisterValedor from 'components/valedor/register'
import RegisterNegocio from 'components/negocio/register'
import RegisterCredit from 'components/credito/register'
import CssBaseline from '@material-ui/core/CssBaseline'
import { dashboardStyles } from './DashboardStyles'
import './dashboard.css'
import DashboardMessages from 'components/DashboardMessages'
import { UserContext } from 'context/userContext'
import { ValedorDashboard } from './ValedorDashboard/ValedorDashboard'
import { AddVale } from 'components/valedor/addVale'
import { clientMessageHistory } from 'requests/createMail'
import ValedoresChart from './ValedoresChart'

export const Dashboard = () => {
  const classes = dashboardStyles()
  const [showDialog, setShowDialog] = useState(false)
  const [dialogName, setDialogName] = useState('valedor')
  const [messages, setMessages] = useState([])
  const [valedores, setValedores] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getMessages() {
      const { success, response, error } = await clientMessageHistory(
        user.email
      )
      if (success && response) {
        //console.log(response.data)
        setMessages(response.data)
        if (response.data.length > 5) {
          //setScroll(true)
        }
        if (response.data.length > 0) {
          const resp = response.data[0].message.idChat
          localStorage.setItem('idChat', resp)
        }
        //setLoading(false)
        //logOutMessages()
        // setTimeout(() => {
        //   setReload(true)
        // }, 3000)
      } else {
        //console.log(error)
      }
    }
    getMessages()
    //scrollToBottom()
  }, [])

  const handleDialog = () => {
    if (dialogName === 'valedor') {
      return (
        <ResponsivePopUp
          open={showDialog}
          setOpen={setShowDialog}
          title={'Registra un valedor'}
        >
          <RegisterValedor />
        </ResponsivePopUp>
      )
    }
    if (dialogName === 'vale') {
      return (
        <ResponsivePopUp
          open={showDialog}
          setOpen={setShowDialog}
          title={'Crear Vale'}
        >
          <AddVale />
        </ResponsivePopUp>
      )
    }
    if (dialogName === 'negocio') {
      return (
        <ResponsivePopUp
          open={showDialog}
          setOpen={setShowDialog}
          title={'Registra un negocio'}
        >
          <RegisterNegocio />
        </ResponsivePopUp>
      )
    }
    return (
      <ResponsivePopUp
        open={showDialog}
        setOpen={setShowDialog}
        title={'Agrega cr??dito'}
      >
        <RegisterCredit />
      </ResponsivePopUp>
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container className="dashboard-container" spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className="register-button"
            onClick={() => {
              setShowDialog(true)
              setDialogName('valedor')
            }}
          >
            <div>
              <AddIcon className={classes.addIcon} />
            </div>

            <p>
              {/* <p>Total:{valedores.length}</p> */}
              Agregar Valedor
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className="register-button"
            onClick={() => {
              setShowDialog(true)
              setDialogName('negocio')
            }}
          >
            <div>
              <AddIcon className={classes.addIcon} />
            </div>
            <p>Agregar Negocio</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className="register-button"
            onClick={() => {
              setShowDialog(true)
              setDialogName('credit')
            }}
          >
            <div>
              <AddIcon className={classes.addIcon} />
            </div>
            <p>Agregar Cr??dito</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <DashboardMessages showAll={true} />
        </Grid>
      </Grid>

      {showDialog && handleDialog()}
    </div>
  )
}
