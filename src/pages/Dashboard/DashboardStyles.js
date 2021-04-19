import { makeStyles } from '@material-ui/core/styles'

export const dashboardStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: '10px'
  },
  paperFlex: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex'
  },
  button: {
    color: 'blue'
  },
  text: {
    textAlign: 'center',
    fontSize: '20px'
  },
  number: {
    fontSize: '15px',
    backgroundColor: 'blue',
    borderRadius: '5px',
    padding: '2px',
    paddingRight: '6px',
    paddingLeft: '6px',
    marginRight: '5px',
    color: 'white'
  },
  addIcon: { color: 'white', width: '100%', textAlign: 'center' }
}))
