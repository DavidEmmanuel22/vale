import React from 'react'
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  SvgIcon,
  Toolbar
} from '@material-ui/core'
import { MenuIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const TopBar = ({ onMobileOpen }) => {
  return (
    <AppBar>
      <Toolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileOpen}>
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <Link to="/dashboard"></Link>
        </Hidden>
        <Box ml={2} flexGrow={1} />
        <Box ml={2}></Box>
        <Box ml={2}></Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
