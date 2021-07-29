import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

export default function TemporaryDrawer({ drawerOpen, handleDrawerOpen, routes, handleListItemClick, selectedIndex }) {
  const classes = useStyles()

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    handleDrawerOpen(open)
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <Link to='/'>
          <img
            width='200px'
            style={{ objectFit: 'contain', marginTop: '15px', marginLeft: '10px' }}
            src='/logo-appbar.png'
          ></img>
        </Link>
      </div>
      {routes.map((route, index) => (
        <Link className='listLink' to={route.path} key={index} onClick={() => handleListItemClick(index)}>
          <ListItem button selected={index === selectedIndex}>
            <ListItemIcon>
              <route.icon style={{ color: '#007772' }}></route.icon>
            </ListItemIcon>
            <ListItemText style={{ color: 'grey', fontWeight: '600 !important' }} primary={route.name} />
          </ListItem>
        </Link>
      ))}
    </div>
  )

  return (
    <Drawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
      {list('left')}
    </Drawer>
  )
}
