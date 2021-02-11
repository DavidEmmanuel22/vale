import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
  ContentHero: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  ImageHero: {
    marginTop: '6px'
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
