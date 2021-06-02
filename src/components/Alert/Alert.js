import React from 'react'
import { Alert } from '@material-ui/lab'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Styles from './Styles'

const ActionAlerts = (props) => {
  const classes = Styles()
  return (
    <div className={classes.root}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={props.clearError}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {props.message}
      </Alert>
    </div>
  )
}

export default ActionAlerts
