import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 300

const Styles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24,
    height: '100px'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: 'white'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    margin: '5px 5px',
    color: '#007772'
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1,
    fontsize: '16px',
    lineheight: '3.5',
    marginleft: '10px',
    color: '#6c757d'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: '100px'
    /* [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    } */
  },
  w100: {
    width: '229px'
  },
  minWidth: {
    minWidth: 'fit-content',
    fontSize: 'xx-large'
  },
  ButtonAppBar: {
    position: 'absolute',
    left: '82%',
    top: '25px',
    backgroundColor: '#f9a02b',
    color: 'white',
    textTransform: 'capitalize',
    fontSize: '22px',
    padding: '5px 10px',
    borderRadius: '20px',
    boxShadow: '0 7px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
    '&:hover': {
      backgroundColor: '#f9a02b'
    }
  }
}))

export default Styles
