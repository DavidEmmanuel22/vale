import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default Styles
