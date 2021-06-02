import React, { useState, useEffect, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Hidden } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import RegisterValedor from 'components/valedor/register'
import RegisterNegocio from 'components/negocio/register'
import RegisterCredit from 'components/credito/register'
import CssBaseline from '@material-ui/core/CssBaseline'
import { dashboardStyles } from './DashboardStyles'
import './dashboard.css'
import { ChatRoom } from './ChatRoom/ChatRoom'
import DashboardMessages from 'components/DashboardMessages'
import { UserContext } from 'context/userContext'
import { ValedorDashboard } from './ValedorDashboard/ValedorDashboard'

export const Dashboard = () => {
  const classes = dashboardStyles()
  const [showDialog, setShowDialog] = useState(false)
  const [dialogName, setDialogName] = useState('valedor')
  const { user } = useContext(UserContext)

  console.log(user)

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
        title={'Agrega crédito'}
      >
        <RegisterCredit />
      </ResponsivePopUp>
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container className="dashboard-container" spacing={2}>
        {user.role === 'Admin' && (
          <>
            {' '}
            <Grid item xs={12} sm={6} md={4}>
              <a
                className="register-button"
                href="#"
                onClick={() => {
                  setShowDialog(true)
                  setDialogName('valedor')
                }}
              >
                <div>
                  <AddIcon className={classes.addIcon} />
                </div>
                <p>Agregar Valedor</p>
              </a>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <a
                className="register-button"
                href="#"
                onClick={() => {
                  setShowDialog(true)
                  setDialogName('negocio')
                }}
              >
                <div>
                  <AddIcon className={classes.addIcon} />
                </div>
                <p>Agregar Negocio</p>
              </a>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <a
                className="register-button"
                href="#"
                onClick={() => {
                  setShowDialog(true)
                  setDialogName('credit')
                }}
              >
                <div>
                  <AddIcon className={classes.addIcon} />
                </div>
                <p>Agregar Crédito</p>
              </a>
            </Grid>
            <Grid item xs={12}>
              <DashboardMessages showAll={true} />
            </Grid>
          </>
        )}

        {user.role === 'Valedor' && <ValedorDashboard />}
      </Grid>

      {showDialog && handleDialog()}
    </div>
  )
}
