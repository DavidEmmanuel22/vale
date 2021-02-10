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
    left: '90%',
    top: '20px',
    backgroundColor: '#efc64f',
    color: 'white',
    textTransform: 'capitalize',
    fontSize: '16px',
    padding: '7px 10px'
  },
  ContentLogo: {
    width: '16%',
    position: 'absolute',
    margin: '0px 30px 0px'
  },
  ImgLogo: {
    width: '278px'
  }
}))

export default Styles
