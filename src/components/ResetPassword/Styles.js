import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
  widthbutton: {
    width: '300px',
    borderRadius: 10,
    height: '40px',
    backgroundColor: '#007772',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#007772'
    }
  },
  GridContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  PaperContent: {
    height: '580px',
    width: '500px',
    margin: '40px 0px 0px'
  },
  FormContent: {
    margin: '60px'
  },
  ImageLogo: {
    width: '100%'
  },
  FooterText: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#efc64f',
    position: 'relative',
    top: '-22px',
    height: '73px'
  },
  TextInicia: {
    margin: '20px'
  },
  H2Password: {
    margin: '0px 0px 15px'
  },
  TypoEmail: {
    margin: '0px 0px 20px'
  },
  ButtonPassword: {
    margin: '22px 0px 0px',
    backgroundColor: '#007772',
    textTransform: 'inherit',
    color: 'white',
    width: '100%',
    padding: '10px',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#007772'
    }
  },
  InputEmail: {
    width: '100%',
    margin: '12px'
  }
}))

export default Styles
