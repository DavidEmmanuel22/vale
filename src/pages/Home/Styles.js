import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles(() => ({
  AppBar: {
    position: 'sticky',
    zIndex: 100,
    top: 0
  },
  ToolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '3.9em'
  },
  linksContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nav__img: {
    padding: '1em',
    objectFit: 'contain',
    width: '15em'
  },
  home__img: {
    objectFit: 'contain',
    width: '100%'
  }
}))

export default Styles
