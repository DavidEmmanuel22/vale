import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5)
  },
  ButtonBase: {
    position: 'absolute',
    left: '93%'
  },
  secondary: {
    backgroundColor: 'transparent',
    '& .MuiButton-label': {
      color: '#b1a7a6'
    }
  },
  primary: {
    backgroundColor: 'transparent',
    '& .MuiButton-label': {
      color: '#b1a7a6'
    }
  }
}))

export default Styles
