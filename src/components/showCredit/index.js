import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import backgroundImage from '../../images/valedor-green.png'
/*
background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border-radius: 20px;*/

const ShowCredit = ({ height }) => {
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '20px',
            marginBottom: '10px'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)'
        },
        title: {
            fontSize: 16,
            color: '#fff',
            fontWeight: 600,
            textAlign: 'center'
        },
        credit: {
            fontSize: '40px',
            color: '#fff'
        },
        btn: {}
    })

    const classes = useStyles()

    return (
        <Card className={classes.root} variant='outlined'>
            <CardContent>
                <Typography className={classes.title} color='textSecondary' gutterBottom>
                    Credito Disponible
                </Typography>
                <Typography className={classes.credit} color='textSecondary'>
                    4,500 MNX
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button size='small' className={classes.btn} variant='contained' color='secondary'>
                    Conseguir Mas Credito
                </Button>
            </CardActions>
        </Card>
    )
}

export default ShowCredit
