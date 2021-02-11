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
  }
}))

export default Styles
