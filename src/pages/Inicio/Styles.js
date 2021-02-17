import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
  [theme.breakpoints.up('lg')]: {
    ImageGreen: {
      width: '100%'
    }
  },
  [theme.breakpoints.down('sm')]: {
    ContentAdvantage: {
      width: '65%',
      position: 'absolute',
      top: '45%',
      left: '5%'
    },
    ContentJointo: {
      width: '50%',
      position: 'absolute',
      top: '19%',
      margin: '-6px 20px'
    },
    AdvantageH4: {
      color: 'white',
      fontSize: '20px',
      margin: '2% 0% 0%',
      fontWeight: '400'
    },
    YouWantToBeValedor: {
      color: 'white',
      fontSize: '20px',
      margin: '2% 0% 0%',
      fontWeight: '400'
    },
    MuiTypographybody1: {
      fontSize: '12px',
      display: 'none'
    },
    KnowMore: {
      backgroundColor: '#efc64f',
      margin: '4% 1% 0%',
      color: 'white',
      textTransform: 'capitalize',
      fontSize: '14px',
      padding: '4px 10px',
      borderRadius: '20px',
      boxShadow: '0 7px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
    },
    '&:hover': {
      backgroundColor: '#007772'
    },
    ImageGreen: {
      width: '100%'
    },
    ImageHero: {
      marginTop: '6px',
      width: '100%'
    },
    BlackText: {
      fontWeight: 'lighter',
      fontSize: '12px'
    },
    ValedorText: {
      fontWeight: '400',
      fontSize: '20px',
      color: '#007772'
    },
    LocationMap: {
      width: '65%',
      position: 'absolute',
      left: '53%',
      margin: '4% 0% 0%'
    },
    ContentMapText: {
      width: '54%',
      position: 'absolute',
      top: '65%',
      left: '5%'
    },
    JoinText: {
      fontSize: '12px',
      color: '#007772'
    },
    UseVales: {
      fontsize: '20px',
      fontWeight: '400',
      margin: '2% 0% 0%'
    }
  }
}))

export default Styles
