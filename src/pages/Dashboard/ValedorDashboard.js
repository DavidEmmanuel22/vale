import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import ResponsivePopUp from 'components/popUp/responsivePopUp'
import CssBaseline from '@material-ui/core/CssBaseline'
import { dashboardStyles } from './DashboardStyles'
import './dashboard.css'
import { UserContext } from 'context/userContext'
import { ValedorDashboard as VD } from './ValedorDashboard/ValedorDashboard'
import { AddVale } from 'components/valedor/addVale'
import ShowCredit from 'components/showCredit'
import ShowCreditDashboard from 'components/showCredit/showCreditDashboard'

const ValedorDashboard = () => {
    const classes = dashboardStyles()
    const [showDialog, setShowDialog] = useState(false)
    const [dialogName, setDialogName] = useState('valedor')
    const creditRef = React.useRef(null)
    const { user } = useContext(UserContext)

    const handleDialog = () => {
        if (dialogName === 'vale') {
            return (
                <ResponsivePopUp
                    open={showDialog}
                    onClose={() => creditRef.current.reloadCredit()}
                    setOpen={setShowDialog}
                    title={'Crear Vale'}
                >
                    <AddVale />
                </ResponsivePopUp>
            )
        }
        return null
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid container className='dashboard-container' spacing={1}>
                <Grid item xs={12} md={4} lg={4} className='dashboard-container-item'>
                    <a
                        className='register-button'
                        href='#'
                        onClick={() => {
                            setShowDialog(true)
                            setDialogName('vale')
                        }}
                    >
                        <div>
                            <AddIcon className={classes.addIcon} />
                        </div>
                        <p>Crear Vale</p>
                    </a>
                </Grid>
                <Grid item xs={12} md={4} lg={4}></Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <ShowCreditDashboard ref={creditRef} height='75px'></ShowCreditDashboard>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '-10px' }}>
                    <VD showDialog={showDialog} />
                </Grid>
            </Grid>

            {showDialog && handleDialog()}
        </div>
    )
}

export default ValedorDashboard
