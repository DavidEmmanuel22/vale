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
    top: '30px',
    backgroundColor: '#efc64f',
    color: 'white',
    textTransform: 'capitalize',
    fontSize: '22px',
    padding: '5px 11px',
    borderRadius: '20px',
    boxShadow: '0 7px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
    '&:hover': {
      backgroundColor: '#efc64f'
    }
  },
  ContentLogo: {
    width: '16%',
    position: 'absolute',
    margin: '0% 3% 0%'
  },
  ImgLogo: {
    width: '370px'
  },
  SvgIconHam: {
    position: 'relative',
    left: '43%',
    top: '10px'
  }
}))

export default Styles
