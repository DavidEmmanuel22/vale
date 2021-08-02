import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Button, Collapse, InputAdornment, Typography } from '@material-ui/core'
import QrReader from 'react-qr-reader'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import ResponsivePopUp from '../../components/popUp/responsivePopUp'
import ExchangeVale from '../../components/exchangeVale'

const BussinesDashboard = () => {
    const matches = useMediaQuery('(min-width:600px)')
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: matches ? theme.spacing(2) : theme.spacing(1),
            textAlign: 'center',
            borderRadius: '15px',
            color: theme.palette.text.secondary
        },
        input: {
            display: 'none'
        },
        TextField: {
            marginTop: '18px',
            width: '90%'
        },
        changePassword: {
            float: 'right',
            marginTop: '20px',
            marginRight: '20px'
        },
        avatar: {
            width: '100px',
            height: '100px'
        },
        avatarContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        mapButton: {
            borderRadius: 6,
            width: '12em',
            height: '3em',
            cursor: 'pointer',
            padding: '3px',
            backgroundColor: '#007772',
            color: '#ffff',
            '&:hover': {
                backgroundColor: '#007772'
            }
        },
        cameraContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        gridItem: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    }))
    const classes = useStyles()

    const [showExchangePopup, setShowExchangePopup] = React.useState(false)

    const handleExchangeClick = () => {
        setShowExchangePopup(true)
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} className={classes.gridItem}>
                            <Button onClick={handleExchangeClick} color='primary' variant='contained'>
                                Canjear Vale
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <ResponsivePopUp open={showExchangePopup} setOpen={setShowExchangePopup} title='Canjea Un Vale'>
                <ExchangeVale></ExchangeVale>
            </ResponsivePopUp>
        </Grid>
    )
}

export default BussinesDashboard
