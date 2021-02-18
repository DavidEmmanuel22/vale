import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
  [theme.breakpoints.up('lg')]: {
    ImageGreen: {
      width: '100%'
    },
    ContentHero: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    ImageHero: {
      marginTop: '6px'
    },
    ContentGreen: {},
    ContentAdvantage: {
      width: '45%',
      position: 'absolute',
      top: '236%',
      left: '52%'
    },
    ContentMapText: {
      width: '45%',
      position: 'absolute',
      top: '331%',
      left: '8%'
    },
    ContentMap: {
      display: 'flex'
    },
    LocationMap: {
      width: '60%',
      position: 'absolute',
      left: '55%'
    },
    ImageMap: {
      width: '70%'
    },
    ContentJointo: {
      width: '50%',
      position: 'absolute',
      top: '26%',
      margin: '4px 60px'
    },
    BlackText: {
      fontWeight: 'lighter',
      fontSize: '20px'
    },
    JoinText: {
      fontSize: '90px',
      fontWeight: '400',
      margin: '13px 0px'
    },
    ValedorText: {
      fontWeight: '400',
      fontSize: '90px',
      color: '#007772'
    },
    KnowMore: {
      backgroundColor: '#efc64f',
      margin: '7% 1% 0%',
      width: '25%',
      color: 'white',
      textTransform: 'capitalize',
      fontSize: '16px',
      padding: '8px 16px',
      borderRadius: '20px',
      boxShadow: '0 7px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
    },
    '&:hover': {
      backgroundColor: '#007772'
    },
    ContentHome: {}
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
    ImageMap: {
      width: '61%'
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
      width: '100%',
      position: 'absolute',
      left: '37%',
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
