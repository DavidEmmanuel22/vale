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
import { Link } from 'react-router-dom'
import { Container, Button } from '@material-ui/core'
import { UserContext } from '../../../context/userContext'
import './Styles.css'
import { GeneralLayoutStyle } from './GeneralLayoutStyle'
import NavBar from 'components/NavBar/NavBar'

// eslint-disable-next-line react/prop-types
export default function GeneralLayout({ children }) {
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
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
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
          {
            <Link
              className="listLink"
              onClick={drawOpen ? () => handleDrawerOpen(!drawOpen) : null}
              to="/dashboard"
            >
              <ListItem
                button
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <Dashboard style={{ color: '#007772' }}></Dashboard>
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Dashboard'} />
              </ListItem>
            </Link>
          }
          {
            <Link
              onClick={drawOpen ? () => handleDrawerOpen(!drawOpen) : null}
              className="listLink"
              to="/dashboard/profile"
            >
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <Person style={{ color: '#007772' }} />
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Perfil'} />
              </ListItem>
            </Link>
          }
          {
            <Link
              onClick={drawOpen ? () => handleDrawerOpen(!drawOpen) : null}
              className="listLink"
              to="/dashboard/valedores"
            >
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <People style={{ color: '#007772' }} />
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Valedores'} />
              </ListItem>
            </Link>
          }
          {
            <Link
              onClick={drawOpen ? () => handleDrawerOpen(!drawOpen) : null}
              className="listLink"
              to="/dashboard/negocios"
            >
              <ListItem
                button
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <Store style={{ color: '#007772' }} />
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Negocios'} />
              </ListItem>
            </Link>
          }
          {
            <Link
              onClick={drawOpen ? () => handleDrawerOpen(!drawOpen) : null}
              className="listLink"
              to="/dashboard/compras"
            >
              <ListItem
                button
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <LoyaltyIcon style={{ color: '#007772' }}></LoyaltyIcon>
                </ListItemIcon>
                <ListItemText
                  style={{ color: 'grey' }}
                  primary={'Lista Compras'}
                />
              </ListItem>
            </Link>
          }
          {
            <Link
              onClick={drawOpen ? () => handleDrawerOpen(!drawOpen) : null}
              className="listLink"
              to="/dashboard/contactos"
            >
              <ListItem
                button
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
              >
                <ListItemIcon>
                  <ContactsIcon style={{ color: '#007772' }}></ContactsIcon>
                </ListItemIcon>
                <ListItemText style={{ color: 'grey' }} primary={'Contactos'} />
              </ListItem>
            </Link>
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth={false}>{hasLoad && children}</Container>
      </main>
    </div>
  )
}
