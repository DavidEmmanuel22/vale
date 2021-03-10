import React, { useState, createContext, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import './popup.css'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4" className="">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

export const AlertContext = createContext()

export default function ResponsivePopUp({
  title,
  children,
  open,
  setOpen,
  confirmText
}) {
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [alertText, setAlertText] = useState('')
  const [alertColor, setAlertColor] = useState('success')

  useEffect(() => {
    setTimeout(() => {
      setAlertText('')
      setAlertColor('success')
    }, 8000)
  }, [alertText])

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="custom-dialog"
      >
        <DialogTitle
          className="custom-dialog-title"
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
          {alertText !== '' && <Alert severity={alertColor}>{alertText}</Alert>}
        </DialogTitle>

        <DialogContent dividers>
          <AlertContext.Provider
            value={{
              alertText,
              setAlertText,
              alertColor,
              setAlertColor,
              handleClose
            }}
          >
            {children}
          </AlertContext.Provider>
        </DialogContent>
      </Dialog>
    </div>
  )
}
