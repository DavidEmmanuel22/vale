import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
  widthnew: {
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
    marginTop: 30,
    margin: 'auto'
  },
  widthbutton: {
    width: '300px',
    borderRadius: 10,
    margin: '35px 0px 0px',
    height: '40px',
    backgroundColor: '#007772',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#007772'
    }
  }
}))

export default Styles
