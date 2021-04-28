import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Dashboard, Person, People, Store } from '@material-ui/icons'
import LoyaltyIcon from '@material-ui/icons/Loyalty'
import ContactsIcon from '@material-ui/icons/Contacts'
import { Link, Route } from 'react-router-dom'
import { Container, Button } from '@material-ui/core'
import { UserContext } from '../../../context/userContext'
import './Styles.css'
import { GeneralLayoutStyle } from './GeneralLayoutStyle'
import NavBar from 'components/NavBar/NavBar'

// eslint-disable-next-line react/prop-types
export default function GeneralLayout({ children, routes }) {
  const classes = GeneralLayoutStyle()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const {
    isAuthenticated,
    user,
    logout,
    hasLoad,
    drawOpen,
    handleDrawerOpen
  } = useContext(UserContext)

  React.useEffect(() => {
    const path = window.location.pathname
    routes.forEach((route, index) => {
      if (route.path === path) {
        setSelectedIndex(index)
      }
    })
  }, [])

  const handleListItemClick = (index) => {
    if (drawOpen) {
      handleDrawerOpen(!drawOpen)
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawOpen,
          [classes.drawerClose]: !drawOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawOpen,
            [classes.drawerClose]: !drawOpen
          })
        }}
      >
        <List style={{ marginTop: '22px', padding: '10px' }}>
          {/*     ADMIN ROUTES		*/}
          {routes.map((route, index) => (
            <Link
              className="listLink"
              to={route.path}
              key={index}
              onClick={() => handleListItemClick(index)}
            >
              <ListItem button selected={selectedIndex === index}>
                <ListItemIcon>
                  <route.icon style={{ color: '#007772' }}></route.icon>
                </ListItemIcon>
                <ListItemText
                  style={{ color: 'grey', fontWeight: '600 !important' }}
                  primary={route.name}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={`${classes.content}`}>
        <Container maxWidth={false}>{hasLoad && children}</Container>
      </main>
    </div>
  )
}
