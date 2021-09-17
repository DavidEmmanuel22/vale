import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import _ from 'lodash'
import ValedorPaymentTable from 'components/Tables/ValedorPaymentTable'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    mainPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: `calc(100vh - 172px)`,
        overflowY: 'scroll'
    },
    titlePaper: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '65px'
    },
    title: {
        color: 'black'
    }
}))

const ValedorPayment = () => {
    const { idValedor } = useParams()
    const location = useLocation()

    const classes = useStyles()

    React.useEffect(() => {
        console.log(location)
    }, [])

    return (
        <Grid container spacing={1} style={{ height: '100%' }}>
            <Grid item xs={12}>
                <Paper className={classes.titlePaper}>
                    <Typography component='h4' className={classes.title}>
                        Historial de Pagos - {_.get(location, 'state.valedor.firstName')}{' '}
                        {_.get(location, 'state.valedor.lastName')}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.mainPaper}>
                    <ValedorPaymentTable></ValedorPaymentTable>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ValedorPayment
