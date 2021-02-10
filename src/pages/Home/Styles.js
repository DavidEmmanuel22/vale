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
    padding: '7px 10px',
    BoxShadow: '-1px 9px 13px -3px #88888',
    borderRadius: '20px'
  },
  ContentLogo: {
    width: '16%',
    position: 'absolute',
    margin: '0% 6% 0%'
  },
  ImgLogo: {
    width: '278px'
  }
}))

export default Styles
