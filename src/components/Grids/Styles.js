import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  paperLeft: {
    padding: theme.spacing(2)
  },
  ContentPaper3: {
    display: 'flex',
    width: '51%',
    margin: '7px 0px'
  },
  MuiGrid6: {
    flexGrow: '0',
    maxWidth: '46%',
    flexBasis: '46%'
  },
  MuiGrid3: {
    flexGrow: '0',
    maxWidth: '98%',
    flexBasis: '98%',
    margin: '5px'
  },
  MuiGrid12: {
    flexGrow: '0'
  },
  rootCard: {
    display: 'flex',
    width: '50%',
    height: '79px',
    margin: '10px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9a02b'
  },
  content: {
    flex: '1 0 auto'
  },
  TypografyFlex: {
    margin: '0px 5px',
    display: 'flex'
  }
}))

export default Styles
