import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import backgroundImage from '../../images/valedor-green.png'
import { getCredit } from 'requests/allValedores'
import { CircularProgress } from '@material-ui/core'
/*
background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border-radius: 20px;*/

const ShowCredit = React.forwardRef(({ height }, ref) => {
    const useStyles = makeStyles({
        root: {
            width: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '20px',
            marginBottom: '10px',
            height
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
            color: '#fff',
            textAlign: 'center'
        },
        btn: {}
    })

    const classes = useStyles()

    const [credit, setCredit] = React.useState(0)
    const [loading, setLoading] = React.useState(true)

    async function getAllCredit() {
        const { success, response, error } = await getCredit()
        if (success && response) {
            if (response.data && response.data.credits) {
                setCredit(response.data.credits)
            }
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getAllCredit()
    }, [])

    function test() {
        console.log('test')
    }

    React.useImperativeHandle(ref, () => {
        return {
            test: () => test(),
            reloadCredit: () => {
                setLoading(true)
                getAllCredit()
            }
        }
    })

    return (
        <Card className={classes.root} variant='outlined'>
            <CardContent>
                <Typography className={classes.title} color='textSecondary' gutterBottom>
                    Credito Disponible
                </Typography>
                {loading && <CircularProgress color='secondary'></CircularProgress>}
                <Typography className={classes.credit} color='textSecondary'>
                    {!loading && `${credit} MXN`}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button size='small' className={classes.btn} variant='contained' color='secondary'>
                    Conseguir Mas Credito
                </Button>
            </CardActions>
        </Card>
    )
})
export default ShowCredit
