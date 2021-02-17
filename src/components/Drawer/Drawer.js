import { Drawer, Hidden } from '@material-ui/core'
import React, { Fragment } from 'react'
import Styles from './Styles'

const DrawerLeft = ({ openMobile, onMobileClose }) => {
  const classes = Styles()

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="right"
          variant="temporary"
          open={openMobile}
          onClose={onMobileClose}
          classes={{ paper: classes.mobileDrawer }}
        ></Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="right"
          variant="persistent"
          open
          classes={{ paper: classes.desktopDrawer }}
        ></Drawer>
      </Hidden>
    </Fragment>
  )
}

export default DrawerLeft