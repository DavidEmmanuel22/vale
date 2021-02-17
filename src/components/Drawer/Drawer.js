import { Drawer, Hidden } from '@material-ui/core'
import React, { Fragment } from 'react'
import Styles from './Styles'

const DrawerLeft = () => {
  const classes = Styles()
  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer anchor="left" className={classes.mobileDrawer}></Drawer>
      </Hidden>
    </Fragment>
  )
}

export default DrawerLeft
