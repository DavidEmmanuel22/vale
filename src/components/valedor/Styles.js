import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
  widthnew: {
    display: 'flex',
    'flex-direction': 'column',
    margin: 'auto'
  },
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
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center'
  }
}))

export default Styles
