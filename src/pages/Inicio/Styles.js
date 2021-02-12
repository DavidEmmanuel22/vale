import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
  ContentHero: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  ImageHero: {
    marginTop: '6px'
  },
  ContentGreen: {},
  [theme.breakpoints.up('lg')]: {
    ImageGreen: {
      width: '100%'
    }
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
    margin: '1px 35px'
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
    color: 'white',
    textTransform: 'capitalize',
    fontSize: '16px',
    padding: '4px 10px',
    borderRadius: '20px',
    boxShadow: '0 7px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
  }
}))

export default Styles
