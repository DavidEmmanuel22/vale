import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import backgroundImage from '../../images/valedor-green.png'

const ShowCreditDashboard = ({ height }) => {
    const useStyles = makeStyles({
        root: {
            width: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '6px',
            marginBottom: '10px',
            height,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)'
        },
        title: {
            fontSize: 14,
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '-10px',
            marginTop: '10px'
        },
        credit: {
            fontSize: '40px',
            color: '#fff',
            textAlign: 'center'
        },
        btn: {}
    })

    const classes = useStyles()

    return (
        <Card className={classes.root} variant='outlined'>
            <CardContent>
                <Typography color='secondary' className={classes.title}>
                    Credito Disponible
                </Typography>
                <Typography className={classes.credit} color='textSecondary'>
                    4,500 MXN
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ShowCreditDashboard
