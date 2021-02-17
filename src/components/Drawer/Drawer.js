import { Drawer, Hidden } from '@material-ui/core'
import React, { Fragment } from 'react'

const DrawerLeft = ({ openMobile, onMobileClose }) => {
  return (
    <Fragment>
      <Hidden>
        <Drawer
          anchor="right"
          variant="temporary"
          open={openMobile}
          onClose={onMobileClose}
        ></Drawer>
      </Hidden>
    </Fragment>
  )
}

export default DrawerLeft
