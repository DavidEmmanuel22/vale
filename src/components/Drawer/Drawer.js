import { Drawer, Hidden } from '@material-ui/core'
import React, { Fragment } from 'react'
import clsx from 'clsx'
import Styles from './Styles'

const DrawerLeft = () => {
  const classes = Styles()
  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerClose]: !open
            })
          }}
        ></Drawer>
      </Hidden>
    </Fragment>
  )
}

export default DrawerLeft
