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
import { BusinessHistory } from 'components/BusinessHistory'

const BussinesDashboard = () => {
    const matches = useMediaQuery('(min-width:600px)')
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: matches ? theme.spacing(2) : theme.spacing(1),
            textAlign: 'center',
            borderRadius: '9px',
            color: theme.palette.text.secondary
        },
        paper2: {
            padding: matches ? theme.spacing(2) : theme.spacing(1),
            textAlign: 'center',
            borderRadius: '9px',
            marginTop: '10px',
            height: 'calc(100vh - 180px)',
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
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    }))
    const classes = useStyles()

    const [showExchangePopup, setShowExchangePopup] = React.useState(false)
    const [currentDate, setCurrentDate] = React.useState(new Date().toISOString().slice(0, 10))
    const historyRef = React.useRef()

    const handleExchangeClick = () => {
        setShowExchangePopup(true)
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                placeholder='search...'
                                type='date'
                                value={currentDate}
                                onChange={e => setCurrentDate(e.target.value)}
                            ></TextField>
                            <Button onClick={handleExchangeClick} color='primary' variant='contained'>
                                Canjear Vale
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper2}>
                    <BusinessHistory ref={historyRef}></BusinessHistory>
                </Paper>
            </Grid>
            <ResponsivePopUp
                open={showExchangePopup}
                setOpen={setShowExchangePopup}
                onClose={() => historyRef.current.reload()}
                title='Canjea Un Vale'
            >
                <ExchangeVale ref={historyRef}></ExchangeVale>
            </ResponsivePopUp>
        </Grid>
    )
}

export default BussinesDashboard
