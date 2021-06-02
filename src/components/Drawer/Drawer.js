import { Drawer, Hidden } from '@material-ui/core'
import React, { Fragment } from 'react'
// import Styles from './Styles'

const DrawerLeft = () => {
  // const classes = Styles()
  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer variant="temporary"></Drawer>
      </Hidden>
    </Fragment>
  )
}

export default DrawerLeft
