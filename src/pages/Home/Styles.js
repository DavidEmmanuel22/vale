import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
  AppBar: {
    position: 'fixed',
    zIndex: 100,
    boxShadow: '0 0 0 0'
  },
  ToolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px'
  },
  linksContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export default Styles
