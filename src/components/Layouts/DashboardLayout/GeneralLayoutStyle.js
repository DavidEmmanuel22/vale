import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 250

export const GeneralLayoutStyle = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: '80px',
    backgroundColor: 'white',
    position: 'fixed'
  },
  //   appBarShift: {
  //     height: '80px',
  //     backgroundColor: 'white'
  //   },
  menuButton: {
    marginRight: 'auto',
    paddingLeft: '25px',
    color: '#007772'
  },
  //   hide: {
  //     display: 'none'
  //   },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    top: '80px'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    },
    top: '80px'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    height: '80px',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: '#e5e5e5',
    marginTop: '80px',
    paddingTop: '30px',
    minHeight: '100vh'
  },
  dividerLine: {
    margin: '30px 0px'
  },
  ButtonLogin: {
    marginLeft: 'auto',
    position: 'absolute',
    textAlign: 'center',
    fontSize: '18px',
    boxShadow: '0 7px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
    borderRadius: '15px',
    textTransform: 'capitalize'
  }
}))
