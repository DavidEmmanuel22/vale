import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
  Buttonlogin: {
    position: 'absolute',
    bottom: '95.5%',
    left: '98%'
  },
  Logobar: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '30%'
  },
  LogoAppBar: {
    height: '78px',
    margin: '0px 20px',
    display: 'none'
  },
  ButtonAppBar: {
    position: 'absolute',
    left: '88%',
    top: '20px',
    backgroundColor: '#efc64f',
    color: 'white',
    textTransform: 'capitalize',
    fontSize: '16px',
    padding: '4px 10px',
    borderRadius: '20px',
    BoxShadow: '-1px 3px 13px -3px rgba(8,8,8,8)'
  },
  ContentLogo: {
    width: '16%',
    position: 'absolute',
    margin: '0% 6% 0%'
  },
  ImgLogo: {
    width: '278px'
  },
  ContentHero: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  ImageHero: {
    marginTop: '7px'
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
